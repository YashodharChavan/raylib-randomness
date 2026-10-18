const r = require("raylib");

function setup() {
    const world = {
        windowWidth: 500,
        windowHeight: 400,
        pointCount: 1000,
        rectangle: {
            x: 40,
            y: 50,
            width: 300,
            height: 200,
        },
    };

    world.pointsX = generateRandomCoordinates(
        world.pointCount,
        world.rectangle.x,
        world.rectangle.width,
    );
    world.pointsY = generateRandomCoordinates(
        world.pointCount,
        world.rectangle.y,
        world.rectangle.height,
    );

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(
        world.windowWidth,
        world.windowHeight,
        "A Random Point In a Rectangle",
    );
    r.SetTargetFPS(30);

    return world;
}

function generateRandomCoordinates(count, start, end) {
    const randomPoints = [];
    for (let i = 0; i < count; i++) {
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
        const posX = world.pointsX[i];
        const posY = world.pointsY[i];

        r.DrawCircle(posX, posY, 5, r.WHITE);
    }
}

function drawRectangle(world) {
    r.DrawRectangleRec(world.rectangle, r.RED);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawRectangle(world);
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
