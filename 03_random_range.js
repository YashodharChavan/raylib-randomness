const r = require("raylib");

function setup() {
    const world = {
        windowWidth: 500,
        windowHeight: 400,
        pointCount: 50,
        start: 50,
        end: 200,
    };

    world.pointsX = generateRandomCoordinates(world, world.start, world.end);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(world.windowWidth, world.windowHeight, "Random Position");
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
    return start + Math.floor(Math.random() * (end - start));
}

function drawPoints(world) {
    for (let i = 0; i < world.pointCount; i++) {
        const start = {
            x: world.pointsX[i],
            y: 0,
        };
        const end = {
            x: world.pointsX[i],
            y: world.windowHeight,
        };
        r.DrawLineEx(start, end, 1, r.WHITE);
    }
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

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
