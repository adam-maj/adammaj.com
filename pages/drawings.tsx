import {
  Box,
  Divider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { NextPageWithLayout } from "next";
import { NextSeo } from "next-seo";
import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import Layout from "../components/Layout";
import { Drawing, getDrawings } from "../lib/drawings";

interface DrawingsPageProps {
  drawings: Drawing[];
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;

type Point = {
  x: number;
  y: number;
};

type GestureLikeEvent = Event & {
  scale?: number;
};

function clampZoom(zoom: number) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom));
}

function getDistance([first, second]: Point[]) {
  return Math.hypot(second.x - first.x, second.y - first.y);
}

function getPointerValues(
  pointers: Map<number, Point>
): [Point, Point] | [Point] | [] {
  const values: Point[] = [];

  pointers.forEach((point) => {
    values.push(point);
  });

  if (values.length >= 2) {
    return [values[0], values[1]];
  }

  if (values.length === 1) {
    return [values[0]];
  }

  return [];
}

function getFirstPointerEntry(
  pointers: Map<number, Point>
): [number, Point] | undefined {
  let firstEntry: [number, Point] | undefined;

  pointers.forEach((point, pointerId) => {
    if (!firstEntry) {
      firstEntry = [pointerId, point];
    }
  });

  return firstEntry;
}

const DrawingsPage: NextPageWithLayout<DrawingsPageProps> = ({ drawings }) => {
  const [selectedDrawing, setSelectedDrawing] = useState<Drawing | null>(null);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const pointersRef = useRef(new Map<number, Point>());
  const zoomRef = useRef(MIN_ZOOM);
  const pinchStartDistanceRef = useRef<number | null>(null);
  const pinchStartZoomRef = useRef(MIN_ZOOM);
  const panStartRef = useRef<{
    pointerId: number;
    point: Point;
    scrollLeft: number;
    scrollTop: number;
  } | null>(null);

  function openDrawing(drawing: Drawing) {
    setSelectedDrawing(drawing);
    setZoom(MIN_ZOOM);
  }

  function closeDrawing() {
    setSelectedDrawing(null);
    setZoom(MIN_ZOOM);
  }

  function updateZoom(nextZoom: number) {
    const clampedZoom = clampZoom(nextZoom);
    zoomRef.current = clampedZoom;
    setZoom(clampedZoom);
  }

  function resetInteractionState() {
    pointersRef.current.clear();
    pinchStartDistanceRef.current = null;
    pinchStartZoomRef.current = MIN_ZOOM;
    panStartRef.current = null;
  }

  function handleWheel(event: ReactWheelEvent<HTMLDivElement>) {
    if (!event.ctrlKey) {
      return;
    }

    event.preventDefault();
    updateZoom(zoomRef.current * Math.exp(-event.deltaY * 0.01));
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const point = { x: event.clientX, y: event.clientY };
    pointersRef.current.set(event.pointerId, point);
    event.currentTarget.setPointerCapture(event.pointerId);

    if (pointersRef.current.size === 1 && zoomRef.current > MIN_ZOOM) {
      panStartRef.current = {
        pointerId: event.pointerId,
        point,
        scrollLeft: viewport.scrollLeft,
        scrollTop: viewport.scrollTop,
      };
    }

    if (pointersRef.current.size === 2) {
      const points = getPointerValues(pointersRef.current);
      if (points.length === 2) {
        pinchStartDistanceRef.current = getDistance(points);
      }
      pinchStartZoomRef.current = zoomRef.current;
      panStartRef.current = null;
    }
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const viewport = viewportRef.current;
    if (!viewport || !pointersRef.current.has(event.pointerId)) {
      return;
    }

    const point = { x: event.clientX, y: event.clientY };
    pointersRef.current.set(event.pointerId, point);

    if (pointersRef.current.size === 2 && pinchStartDistanceRef.current) {
      event.preventDefault();
      const points = getPointerValues(pointersRef.current);
      if (points.length === 2) {
        const distance = getDistance(points);
        updateZoom(
          pinchStartZoomRef.current * (distance / pinchStartDistanceRef.current)
        );
      }
      return;
    }

    if (
      pointersRef.current.size === 1 &&
      zoomRef.current > MIN_ZOOM &&
      panStartRef.current?.pointerId === event.pointerId
    ) {
      event.preventDefault();
      viewport.scrollLeft =
        panStartRef.current.scrollLeft - (point.x - panStartRef.current.point.x);
      viewport.scrollTop =
        panStartRef.current.scrollTop - (point.y - panStartRef.current.point.y);
    }
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    pointersRef.current.delete(event.pointerId);

    if (pointersRef.current.size < 2) {
      pinchStartDistanceRef.current = null;
      pinchStartZoomRef.current = zoomRef.current;
    }

    const remainingPointer = getFirstPointerEntry(pointersRef.current);
    if (remainingPointer && viewportRef.current && zoomRef.current > MIN_ZOOM) {
      const [pointerId, point] = remainingPointer;
      panStartRef.current = {
        pointerId,
        point,
        scrollLeft: viewportRef.current.scrollLeft,
        scrollTop: viewportRef.current.scrollTop,
      };
    } else {
      panStartRef.current = null;
    }
  }

  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  useEffect(() => {
    if (!selectedDrawing) {
      resetInteractionState();
      return;
    }

    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    let gestureStartZoom = zoomRef.current;

    const handleGestureStart = (event: Event) => {
      event.preventDefault();
      gestureStartZoom = zoomRef.current;
    };

    const handleGestureChange = (event: Event) => {
      const gestureEvent = event as GestureLikeEvent;
      event.preventDefault();
      updateZoom(gestureStartZoom * (gestureEvent.scale || 1));
    };

    viewport.addEventListener("gesturestart", handleGestureStart, {
      passive: false,
    });
    viewport.addEventListener("gesturechange", handleGestureChange, {
      passive: false,
    });

    return () => {
      viewport.removeEventListener("gesturestart", handleGestureStart);
      viewport.removeEventListener("gesturechange", handleGestureChange);
    };
  }, [selectedDrawing]);

  useEffect(() => {
    if (!selectedDrawing || !viewportRef.current) {
      return;
    }

    viewportRef.current.scrollTop = 0;
    viewportRef.current.scrollLeft = 0;
  }, [selectedDrawing]);

  useEffect(() => {
    if (zoom === MIN_ZOOM && viewportRef.current) {
      viewportRef.current.scrollTop = 0;
      viewportRef.current.scrollLeft = 0;
    }
  }, [zoom]);

  useEffect(() => () => resetInteractionState(), []);

  function handleModalClose() {
    resetInteractionState();
    closeDrawing();
  }

  return (
    <>
      <NextSeo title="Drawings | Adam Majmudar" />
      <VStack width="100%" spacing={0} align="stretch">
        <Divider width="100%" />
        {drawings.map((drawing, index) => (
          <Fragment key={`${drawing.title}-${drawing.date}-${index}`}>
            <VStack width="100%" spacing={3} py={7} align="stretch">
              <Box
                as="button"
                type="button"
                width="100%"
                onClick={() => openDrawing(drawing)}
                cursor="zoom-in"
                _focusVisible={{
                  outline: "2px solid",
                  outlineColor: "gray.400",
                  outlineOffset: "4px",
                }}
              >
                <Image width="100%" src={drawing.image} alt={drawing.title} />
              </Box>
              <VStack spacing={0.5}>
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  color="gray.600"
                  textAlign="center"
                >
                  {drawing.title}
                </Text>
                <Text fontSize="sm" color="gray.500" textAlign="center">
                  {drawing.date}
                </Text>
              </VStack>
            </VStack>
            {index < drawings.length - 1 && <Divider width="100%" my={3} />}
          </Fragment>
        ))}
        <Divider width="100%" />
      </VStack>
      <Modal isOpen={!!selectedDrawing} onClose={handleModalClose} size="full">
        <ModalOverlay bg="blackAlpha.900" />
        <ModalContent bg="transparent" boxShadow="none" maxW="100vw" m={0}>
          <ModalBody p={{ base: 3, md: 5 }}>
            <Flex direction="column" h="calc(100vh - 40px)" gap={4}>
              <Flex justify="flex-end" pr={{ base: 1, md: 2 }}>
                <ModalCloseButton position="static" color="white" />
              </Flex>
              <Box
                border="1px solid"
                borderColor="whiteAlpha.300"
                flex={1}
                overflow="hidden"
                bg="transparent"
              >
                <Box
                  ref={viewportRef}
                  overflow="auto"
                  h="100%"
                  w="100%"
                  onWheel={handleWheel}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                  style={{ touchAction: "none" }}
                >
                  <Flex
                    minH="100%"
                    align="center"
                    justify={zoom === MIN_ZOOM ? "center" : "flex-start"}
                    p={{ base: 4, md: 6 }}
                  >
                    {selectedDrawing && (
                      <Image
                        src={selectedDrawing.image}
                        alt={selectedDrawing.title}
                        width={`${zoom * 100}%`}
                        maxW="none"
                        userSelect="none"
                        draggable={false}
                      />
                    )}
                  </Flex>
                </Box>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

DrawingsPage.getLayout = (page) => <Layout>{page}</Layout>;

export async function getStaticProps() {
  return {
    props: {
      drawings: getDrawings(),
    },
  };
}

export default DrawingsPage;
