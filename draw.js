var coords = require('./coordinates.json');
var coords16x16 = require('./coordinates16x16.json');
(function () {
    'use strict';
    var grid;

    function drawLine(from, to, grid, char) {
        var x = from[0],
            y = from[1],
            toX = to[0],
            toY = to[1];
        // draw line down
        if (x === toX) {
            while(y < to[1]) {
                grid[y][x] = char;
                y += 1;
            }
        }
        // draw line across
        if (y === toY) {
            while(x < to[0]) {
                grid[y][x] = char;
                x += 1;
            }
        }
    }

    function plot(grid, path, char) {
        var i = 0, last, next;
        while (i < path.length) {
            next = path[i];
            if (last && next) {
                // draw line
                if (last[0] === next[0]) {
                    last[1] < next[1] ?
                        drawLine(last, next, grid, char) :
                        drawLine(next, last, grid, char);
                } else {
                    last[0] < next[0] ?
                        drawLine(last, next, grid, char) :
                        drawLine(next, last, grid, char);
                }
            }
            grid[next[1]][next[0]] = char;
            last = next;
            i += 1;
        } 
        return grid;
    }

    function printGrid(grid) {
        var i = 0;
        while (i < grid.length) {
            console.log(grid[i].join(''));
            i += 1;
        }
    }

    function makeGrid(width, height) {
        var grid = [], y = 0;
        while (y < height) {
            grid.push(Array.apply(null, Array(width)).map(function () {
                return ' ';
            }));
            y += 1;
        }
        return grid; 
    }

    console.log('\n' + coords.width + 'x' + coords.height + '\n');

    grid = makeGrid(coords.width, coords.height);
    grid = plot(grid, coords.H, 'H');
    grid = plot(grid, coords.I, 'I');

    printGrid(grid);

    console.log('\n' + coords16x16.width + 'x' + coords16x16.height + '\n');
    
    grid = makeGrid(coords16x16.width, coords16x16.height);
    grid = plot(grid, coords16x16.H, 'H');
    grid = plot(grid, coords16x16.I, 'I');

    printGrid(grid);

    console.log('\n\n');
}());
