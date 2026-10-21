const r = require("raylib");

function setup() {
    const rectX = 40;
    const rectY = 50;
    const rectWidth = 200;
    const rectHeight = 200;

    const world = {
        windowWidth: 500,
        windowHeight: 500,
        pointCount: 100000,
        triangle: {
            verticeA: {
                x: 250,
                y: 100,
            },
            verticeB: {
                x: 100,
                y: 400,
            },
            verticeC: {
                x: 400,
                y: 400,
            },
        },
        currPoint: {
            x: 250,
            y: 200,
        },
    };

    world.vertices = {
        0: world.triangle.verticeA,
        1: world.triangle.verticeB,
        2: world.triangle.verticeC,
    };

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(
        world.windowWidth,
        world.windowHeight,
        "A Random Point In a Rectangle",
    );
    r.SetTargetFPS(30);

    return world;
}

function selectRandomVertice(world) {
    const random = Math.floor(Math.random() * 3);
    return world.vertices[random];
}

function drawTriangleOutlines(world) {
    const verticeA = world.triangle.verticeA;
    const verticeB = world.triangle.verticeB;
    const verticeC = world.triangle.verticeC;

    r.DrawLineEx(verticeA, verticeB, 3, r.WHITE);
    r.DrawLineEx(verticeB, verticeC, 3, r.WHITE);
    r.DrawLineEx(verticeA, verticeC, 3, r.WHITE);
}

function drawPoint(world) {
    r.DrawCircleV(world.currPoint, 1, r.RED);
}

function isRunning() {
    return !r.WindowShouldClose();
}

function draw(world) {
    r.BeginDrawing();

    drawTriangleOutlines(world);
    drawPoint(world);

    r.EndDrawing();
}

function midpoint(pointA, pointB) {
    return { x: (pointA.x + pointB.x) / 2, y: (pointA.y + pointB.y) / 2 };
}

function update(world) {
    const selectedVertice = selectRandomVertice(world);

    world.currPoint = midpoint(selectedVertice, world.currPoint);
}

function tearDown() {
    r.CloseWindow();
}

function loop(world) {
    while (isRunning()) {
        update(world);
        draw(world);
    }
}

function main() {
    const world = setup();
    loop(world);
    tearDown();
}

main();
