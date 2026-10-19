const r = require("raylib");
const g = require("./geometry")

function setup() {
    const world = {
        windowWidth: 500,
        windowHeight: 400,
        pointCount: 100,
        radius: 300,
    };

    world.distances = generateRandomCoordinates(world, 0, world.radius);
    world.angles = generateRandomCoordinates(world, 0, 90);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(
        world.windowWidth,
        world.windowHeight,
        "A Random Point In a Circle",
    );
    r.SetTargetFPS(30);

    return world;
}

function generateRandomCoordinates(world, start, end) {
    const randomPoints = [];
    for (let i = 0; i < world.pointCount; i++) {
        randomPoints.push(generateRandom(start, end));
    }

    return randomPoints;
}

function isRunning() {
    return !r.WindowShouldClose();
}

function generateRandom(start, end) {
    return start + Math.floor(Math.random() * end);
}

function drawPoints(world) {
    for (let i = 0; i < world.pointCount; i++) {
        const posX = world.distances[i] * Math.cos(g.toRadians(world.angles[i]));
        const posY = world.distances[i] * Math.sin(g.toRadians(world.angles[i]));

        r.DrawCircle(posX, posY, 5, r.YELLOW);
    }
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    r.DrawCircleLines(0, 0, world.radius, r.WHITE);
    drawPoints(world);

    r.EndDrawing();
}

function update(world) {}

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
