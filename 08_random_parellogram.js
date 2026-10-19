const r = require("raylib");

function setup() {
    const world = {
        windowWidth: 500,
        windowHeight: 400,
        pointCount: 10,
        start: {
            x: 50,
            y: 60,
        },
        u: {
            x: 250,
            y: 0,
        },
        v: {
            x: 90,
            y: 100,
        },
    };

    world.points = generateRandomCoordinates(world);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(
        world.windowWidth,
        world.windowHeight,
        "A Random Point In a Rectangle",
    );
    r.SetTargetFPS(30);

    return world;
}

function generateRandomCoordinates(world) {
    const randomPoints = [];
    for (let i = 0; i < world.pointCount; i++) {
        const s = Math.random();
        const t = Math.random();

        const point = {
            x: world.start.x + s * world.u.x + t * world.v.x,
            y: world.start.y + s * world.u.y + t * world.v.y,
        }

        randomPoints.push(point);
    }

    return randomPoints;
}

function isRunning() {
    return !r.WindowShouldClose();
}

function drawPoints(world) {
    for (let i = 0; i < world.pointCount; i++) {
        const posX = world.points[i].x;
        const posY = world.points[i].y;

        r.DrawCircle(posX, posY, 5, r.YELLOW);
    }
}

function drawParellogram(world) {
    const pointA = world.start;
    const pointB = r.Vector2Add(world.start, world.u);
    const pointC = r.Vector2Add(world.start, world.v);
    const pointD = r.Vector2Add(world.start, r.Vector2Add(world.u, world.v));

    r.DrawLineEx(pointA, pointB, 2, r.WHITE);
    r.DrawLineEx(pointB, pointD, 2, r.WHITE);
    r.DrawLineEx(pointC, pointD, 2, r.WHITE);
    r.DrawLineEx(pointC, pointA, 2, r.WHITE);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    drawParellogram(world);

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
