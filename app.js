let tetris = null;
let _frame_rate=60
let hammer_obj;
let handle_swipe_lr =
{
    start: null,
    end: null,
    threshold: null
}

function setup() {

    frameRate(_frame_rate)
    tetris = {
        game:
        {
            state: NEVER_STARTED,
            mode: MODE_TIMED,
            handle_state_change: function (_mode) {
                switch (this.state) {
                    case PAUSED:
                        this.state = RUNNING
                        document.querySelector("#menu").style.display = "none"
                        break
                    case RUNNING:
                        this.state = PAUSED
                        document.querySelector("#menu").style.display = "flex"

                    case NEVER_STARTED:
                    case OVER:
                        //also reset board
                        tetris.board.reset_game();
                        this.state = RUNNING
                }
                this.mode = _mode
            }
        },
        hold:
        {
            x: percent(windowWidth, 2.5),
            y: percent(windowHeight, 15),
            w: percent(windowWidth, 15),
            h: percent(windowWidth, 15) * 1.5,
            spacing: 0,
            get_cell_size: function () {
                // return 20
                return this.w / 5

            },
            draw: function () {
                //draw hold piece
                fill("#222")
                rect(this.x, this.y, this.w, this.h, 4)

                if (tetris.board.saved_shape != SHAPE_EMPTY) {

                    let _piece = PIECE_TO_USE[tetris.board.saved_shape + UP]
                    _piece.forEach((row, i) => {
                        row.forEach((cell, j) => {
                            if (cell != EMPTY) {
                                let _x = (j * (this.get_cell_size() + this.spacing))
                                let _y = (i * (this.get_cell_size() + this.spacing))
                                let _r = 2
                                let _offset_x = this.x + (this.get_cell_size() / 2)
                                let _offset_y = this.y + (this.get_cell_size() * 2)

                                //background
                                fill(CELL_COLOR_CODE[1].b)
                                noStroke()
                                rect(_x + _offset_x, _y + _offset_y, this.get_cell_size(), this.get_cell_size())

                                //triangle shadow
                                fill(CELL_COLOR_CODE[1].s)
                                noStroke()
                                beginShape(TRIANGLES);
                                vertex(_x + _offset_x, _y + _offset_y);
                                vertex(_x + _offset_x, _y + _offset_y + this.get_cell_size());
                                vertex(_x + _offset_x + this.get_cell_size(), _y + _offset_y + this.get_cell_size());
                                endShape();

                                //small rect
                                fill(CELL_COLOR_CODE[1].r)
                                noStroke()
                                rect(_x + _offset_x + this.get_cell_size() * 0.2, _y + _offset_y + this.get_cell_size() * 0.2, this.get_cell_size() * 0.6, this.get_cell_size() * 0.6)



                                // rect(_x + _offset_x, _y + _offset_y, this.get_cell_size(), this.get_cell_size(), 2)
                            }
                        });
                    });
                }



            }
        },
        next:
        {
            x: windowWidth - percent(windowWidth, 17.5),
            y: percent(windowHeight, 15),
            w: percent(windowWidth, 15),
            h: percent(windowWidth, 15) * 1.5,
            r: 2,
            spacing: 0,
            get_cell_size: function () {
                // return 20
                return this.w / 5

            },
            draw: function () {
                //draw hold piece
                fill("#222")
                rect(this.x, this.y, this.w, this.h, 4)

                if (tetris.board.next_shape != SHAPE_EMPTY) {

                    let _piece = PIECE_TO_USE[tetris.board.next_shape + UP]
                    _piece.forEach((row, i) => {
                        row.forEach((cell, j) => {
                            if (cell != EMPTY) {
                                let _x = (j * (this.get_cell_size() + this.spacing))
                                let _y = (i * (this.get_cell_size() + this.spacing))
                                let _r = 2
                                let _offset_x = this.x + (this.get_cell_size() / 2)
                                let _offset_y = this.y + (this.get_cell_size() * 2)

                                //background
                                fill(CELL_COLOR_CODE[1].b)
                                noStroke()
                                rect(_x + _offset_x, _y + _offset_y, this.get_cell_size(), this.get_cell_size())

                                //triangle shadow
                                fill(CELL_COLOR_CODE[1].s)
                                noStroke()
                                beginShape(TRIANGLES);
                                vertex(_x + _offset_x, _y + _offset_y);
                                vertex(_x + _offset_x, _y + _offset_y + this.get_cell_size());
                                vertex(_x + _offset_x + this.get_cell_size(), _y + _offset_y + this.get_cell_size());
                                endShape();

                                //small rect
                                fill(CELL_COLOR_CODE[1].r)
                                noStroke()
                                rect(_x + _offset_x + this.get_cell_size() * 0.2, _y + _offset_y + this.get_cell_size() * 0.2, this.get_cell_size() * 0.6, this.get_cell_size() * 0.6)



                                // rect(_x + _offset_x, _y + _offset_y, this.get_cell_size(), this.get_cell_size(), 2)
                            }
                        });
                    });
                }
            }
        }
    }

    //handle board and gameplay
    tetris.board =
    {
        x: percent(windowWidth, 20),
        y: percent(windowHeight, 15),
        w: percent(windowWidth, 60),
        h: percent(windowHeight, 70),
        r: 4,
        rows: 21,//top to bottom count
        cols: 10,//left to right count
        get_cell_size: function () {
            return this.w / this.cols
        },
        spacing: 0,
        ungrabbed_bag: [
            SHAPE_O,
            SHAPE_I,
            SHAPE_S,
            SHAPE_Z,
            SHAPE_L,
            SHAPE_J,
            SHAPE_T],
        matrix: [...Array(21)].map(e => Array(10).fill(EMPTY)),
        shape: SHAPE_T,
        saved_shape: SHAPE_EMPTY,
        allow_shape_save: true,
        next_shape: SHAPE_EMPTY,
        rotation: UP,
        player_x: 5,//track horizontal pos in matrix from top left corner of piece
        player_y: 0,//track vertical pos in matrix from top left corner of piece,
        player_color: CELL_COLOR_CODE[1],
        score: 0,
        lines: 0,
        level: 1,
        streak: 1,
        lines_counter_for_level: 0,
        save_shape: function () {
            if (this.allow_shape_save) {
                if (this.saved_shape == SHAPE_EMPTY) {
                    //save shape if slot is empty
                    this.saved_shape = this.shape
                    this.reset_piece()
                    this.allow_shape_save = false
                } else {
                    //use this piece
                    let _save_shape = this.shape
                    this.shape = this.saved_shape
                    this.saved_shape = _save_shape
                    this.reset_piece(this.shape)
                    this.allow_shape_save = false
                }
            }
        },
        get_last_bottom_cell_row_num: function () {
            for (let index = PIECE_TO_USE[this.shape + this.rotation].length - 1; index >= 0; index--) {
                let row = PIECE_TO_USE[this.shape + this.rotation][index]
                if (row.indexOf(FILLED) != -1) {
                    //this row has filled cell from bottom
                    return index;
                }
            }
        },
        move_player: function (step_x, step_y) {
            let _player_save_x = this.player_x
            let _player_save_y = this.player_y

            this.player_x += step_x
            this.player_y += step_y


            //check bottom hit
            //if lowest cell in player hit bottom
            //moving down
            if (step_y > 0) {
                //bottom hit
                let _bottom_cell_row_num = this.get_last_bottom_cell_row_num();//zero base number
                if (this.player_y + _bottom_cell_row_num > this.rows - 1)//-1 for zero base number
                {
                    this.player_y = _player_save_y;
                    this.freeze_piece()
                    console.log('bottom hit')
                }
            }

            //check for collision
            //collide with cells in matrix
            //also check for left botto right hit by cells of player
            //loop through current piece > check if next position of cell in piece will collide with cell in matrix
            for (let row_num = 0; row_num < PIECE_TO_USE[this.shape + this.rotation].length; row_num++) {
                const row = PIECE_TO_USE[this.shape + this.rotation][row_num]
                for (let col_num = 0; col_num < row.length; col_num++) {
                    const cell = row[col_num];
                    if (cell != EMPTY) {
                        let _col_num_in_matrix = col_num + this.player_x
                        let _row_num_in_matrix = row_num + this.player_y


                        try {
                            if (this.matrix[_row_num_in_matrix][_col_num_in_matrix] != EMPTY) {
                                //cannot move cell is filled
                                console.log("hit filled cell")

                                if (_row_num_in_matrix < 3 && tetris.game.state == RUNNING && step_y > 0) {
                                    console.log("GAME OVER")
                                    tetris.game.state = OVER
                                    document.querySelector("#menu").style.display = "flex"


                                }

                                this.player_x = _player_save_x
                                this.player_y = _player_save_y
                                //do nothing if left or right
                                //freeze piece if hit down
                                if (step_y > 0) {
                                    //hit something when moving bottom
                                    this.player_y = _player_save_y;
                                    this.freeze_piece()
                                }
                            }
                        } catch (error) {
                            //if local pos throws exception means something was out of bound
                            console.log("out of bounds")
                        }
                    }
                }
            }


        },
        rotate_player: function () {
            //save old piece
            let _rotation_save = this.rotation;

            this.rotation++
            if (this.rotation > LEFT)
                this.rotation = UP

            //map local positions to matrix
            let rotatation_allowed = true
            PIECE_TO_USE[this.shape + this.rotation].forEach((row, i) => {
                row.forEach((cell, j) => {
                    if (cell != EMPTY) {
                        let _local_pos_to_matrix_pos_x = j + this.player_x
                        let _local_pos_to_matrix_pos_y = i + this.player_y
                        //y vertical row x horizontal x

                        try {
                            if (this.matrix[_local_pos_to_matrix_pos_y][_local_pos_to_matrix_pos_x] != EMPTY) {
                                //do not allow rotation
                                console.log("rotation not allowed piece filled")
                                rotatation_allowed = false;

                            }
                        } catch (error) {
                            console.log("rotation outside matrix")
                            rotatation_allowed = false
                        }

                    }
                })
            })

            if (!rotatation_allowed) {
                this.rotation = _rotation_save
            }

        },
        check_for_lines: function () {
            //
            let _matrix_save = this.matrix
            let _count = 0;
            _matrix_save.forEach((row, i) => {
                // let sum=row.reduce((total,item)=>{return total+item})
                if (row.indexOf(0) == -1) {
                    //clear this line no zeros found
                    _matrix_save.splice(i, 1)
                    // console.log("clearing line",i)
                    _matrix_save.unshift(Array(10).fill(EMPTY))
                    _count++
                }
            })
            this.matrix = _matrix_save

            //calculate score
            this.update_score(_count)

        },
        update_score: function (_count) {
            let _points = 0;
            if (_count == NO_LINES) {
                //reset combo
                this.streak = 1
            } else {
                this.streak++
            }
            let _index = _count
            this.shape == SHAPE_T ? _index += SHAPE_T : 1
            _points = POINTS_BAG[_index] * this.level * this.streak
            this.streak > 1 ? _points *= COMBO : 1;
            //set score
            tetris.score.animate_score_limit = this.score + _points
            //this.score += _points
            //set lines cleared
            this.lines += _count

            //increase level
            this.lines_counter_for_level += _count
            if (this.level <= 8) {
                if (this.lines_counter_for_level >= 10) {
                    this.level++;
                    this.lines_counter_for_level = 0
                }
            } else if (this.level >= 9 && this.level <= 15) {
                if (this.lines_counter_for_level >= 100) {
                    this.level++;
                    this.lines_counter_for_level = 0
                }
            } else if (this.level >= 16 && this.level <= 25) {
                if (this.lines_counter_for_level >= 10) {
                    this.level++;
                    this.lines_counter_for_level = 0
                }
            } else if (this.level >= 25 && this.level <= 28) {
                if (this.lines_counter_for_level >= 100) {
                    this.level++;
                    this.lines_counter_for_level = 0
                }
            }

        },
        freeze_piece: function () {
            PIECE_TO_USE[this.shape + this.rotation].forEach((row, i) => {
                row.forEach((cell, j) => {
                    if (cell != EMPTY) {
                        let _local_pos_to_matrix_pos_x = j + this.player_x
                        let _local_pos_to_matrix_pos_y = i + this.player_y
                        //y vertical row x horizontal x
                        this.matrix[_local_pos_to_matrix_pos_y][_local_pos_to_matrix_pos_x] = this.player_color.code
                    }
                })
            })

            //check for line clear
            this.check_for_lines()

            //reset piece
            this.reset_piece()

        },
        grab_bag_algo: function () {
            if (this.ungrabbed_bag.length == 0) {
                this.ungrabbed_bag = [
                    SHAPE_O,
                    SHAPE_I,
                    SHAPE_S,
                    SHAPE_Z,
                    SHAPE_L,
                    SHAPE_J,
                    SHAPE_T]
            }
            let _piece = random(this.ungrabbed_bag)
            this.ungrabbed_bag = this.ungrabbed_bag.remove(_piece)
            return _piece;
        },
        reset_piece: function () {
            this.player_x = 4
            this.player_y = 0
            //override grab_bag if saved piece is being used
            if (arguments.length > 0) {
                this.shape = arguments[0]
                this.rotation = UP
            } else {
                //will pick up shape from next shape
                this.shape = this.next_shape
                //get new next shape
                this.next_shape = this.grab_bag_algo()
                this.rotation = random(ROTATION_ARRAY)
            }
            this.player_color = CELL_COLOR_CODE[parseInt(random(1, 7))]

            //allow saving shape as next piece is being spawn
            this.allow_shape_save = true
        },
        reset_game: function () {
            this.matrix = [...Array(21)].map(e => Array(10).fill(EMPTY))
            //get a random shape for start
            this.shape = this.grab_bag_algo()
            //get a random shape for next piece
            this.next_shape = this.grab_bag_algo()
            this.saved_shape = SHAPE_EMPTY
            this.allow_shape_save = true
            this.rotation = UP
            this.player_x = 4
            this.player_y = 0
            this.player_color = CELL_COLOR_CODE[1]
            this.score = 0
            this.lines = 0
            this.level = 1
            this.streak = 1
            this.lines_counter_for_level = 0
            tetris.timer.value = 0
            document.querySelector("#menu").style.display = "none"

        },
        draw: function () {
            // stroke("#111");
            //background
            //rect(this.x, this.y, this.w, this.h, this.r)

            //draw all cells
            this.matrix.forEach((row, i) => {
                row.forEach((cell, j) => {
                    if (cell != EMPTY) {
                        let _x = (j * (this.get_cell_size() + this.spacing))
                        let _y = (i * (this.get_cell_size() + this.spacing))
                        let _offset_x = this.x
                        let _offset_y = this.y
                        //background
                        fill(CELL_COLOR_CODE[cell].b)
                        noStroke()
                        rect(_x + _offset_x, _y + _offset_y, this.get_cell_size(), this.get_cell_size(), 4)

                        //triangle shadow
                        fill(CELL_COLOR_CODE[cell].s)
                        noStroke()
                        beginShape(TRIANGLES);
                        vertex(_x + _offset_x, _y + _offset_y);
                        vertex(_x + _offset_x, _y + _offset_y + this.get_cell_size());
                        vertex(_x + _offset_x + this.get_cell_size(), _y + _offset_y + this.get_cell_size());
                        endShape();

                        //small rect
                        fill(CELL_COLOR_CODE[cell].r)
                        noStroke()
                        rect(_x + _offset_x + this.get_cell_size() * 0.2, _y + _offset_y + this.get_cell_size() * 0.2, this.get_cell_size() * 0.6, this.get_cell_size() * 0.6, 2)
                    }
                    else {
                        fill("#222")
                        stroke("#111")
                        let _x = (j * (this.get_cell_size() + this.spacing))
                        let _y = (i * (this.get_cell_size() + this.spacing))
                        let _r = 2
                        let _offset_x = this.x
                        let _offset_y = this.y
                        rect(_x + _offset_x, _y + _offset_y, this.get_cell_size(), this.get_cell_size(), _r)


                    }

                });
            });

            //draw player
            noStroke();
            let _piece = PIECE_TO_USE[this.shape + this.rotation]
            _piece.forEach((row, i) => {
                row.forEach((cell, j) => {
                    if (cell != EMPTY) {
                        let _x = (j * (this.get_cell_size() + this.spacing))
                        let _y = (i * (this.get_cell_size() + this.spacing))
                        let _r = 2
                        let _offset_x = this.x + (this.player_x * this.get_cell_size())
                        let _offset_y = this.y + (this.player_y * this.get_cell_size())
                        //background
                        fill(this.player_color.b)
                        noStroke()
                        rect(_x + _offset_x, _y + _offset_y, this.get_cell_size(), this.get_cell_size(), 4)

                        //triangle shadow
                        fill(this.player_color.s)
                        noStroke()
                        beginShape(TRIANGLES);
                        vertex(_x + _offset_x, _y + _offset_y);
                        vertex(_x + _offset_x, _y + _offset_y + this.get_cell_size());
                        vertex(_x + _offset_x + this.get_cell_size(), _y + _offset_y + this.get_cell_size());
                        endShape();

                        //small rect
                        fill(this.player_color.r)
                        noStroke()
                        rect(_x + _offset_x + this.get_cell_size() * 0.2, _y + _offset_y + this.get_cell_size() * 0.2, this.get_cell_size() * 0.6, this.get_cell_size() * 0.6, 2)
                    }
                });
            });

        }
    },



    //handle scoring board
    tetris.score =
    {
        x: percent(windowWidth, 20),
        y: 0,
        w: percent(windowWidth, 60),
        h: percent(windowHeight, 12),
        animate_score_limit: 0,
        draw: function () {
            fill("#222")
            rect(this.x, this.y, this.w, this.h, 20)
            fill("white")
            textSize(32);
            textAlign(CENTER);
            if (this.animate_score_limit > tetris.board.score)
                tetris.board.score++
            else
                this.animate_score_limit = 0


            text(tetris.board.score, this.x + this.w / 2, this.y + this.h / 2);

            textSize(18);
            fill(COLORS.PURPLE_500)
            text(tetris.board.lines, this.x + this.w / 2, this.y + this.h / 2 + 20);
            textSize(16);
            fill(COLORS.GREEN_500)
            text(tetris.board.level, this.x + this.w / 2, this.y + this.h / 2 + 40);


        }
    }
    
    //handle 3 min game mode
    tetris.timer =
    {
        x: tetris.board.x,
        y: tetris.board.y + tetris.board.get_cell_size()*(tetris.board.rows+1),
        w: tetris.board.w,
        h: 10,
        value: 0,
        limit: 4,
        draw: function () {
            if (tetris.game.mode == MODE_TIMED) {
                fill("#222")
                rect(this.x, this.y, this.w, this.h, 30)

                fill(COLORS.GREEN_500)
                rect(this.x, this.y, percent(this.w, (this.value / this.limit) * 100), this.h, 30)
            }

        }

    }

    createCanvas(windowWidth, windowHeight);
    console.log("canvasW,canvasH", windowWidth, windowHeight)

    // tetris.board.matrix[8][5]=FILLED

    handle_swipe_lr.threshold = tetris.board.get_cell_size()


    //set up swipe events
    hammer_obj = new Hammer(document.querySelector("canvas"))
    hammer_obj.get('swipe').set({
        direction: Hammer.DIRECTION_ALL,
        threshold: 1,
        velocity: 0.1
    });

    hammer_obj.on('swipeup swipedown swipeleft swiperight tap', (event) => {
        //console.log(event.type)
        if (tetris.game.state == RUNNING) {
            switch (event.type) {
                case "swipeleft":
                    tetris.board.move_player(-1, 0)
                    break;
                case "swiperight":
                    tetris.board.move_player(1, 0)
                    break;
                case "swipeup":
                    //hold key
                    tetris.board.save_shape()
                    break;
                case "tap":
                    tetris.board.rotate_player()
                    break;
                case "swipedown":
                    //tetris.board.move_player(0, 1)
                    break;
            }
        }
    })

}

// p5 draw loop
function draw() {
    //canvas color
    background("#111");

    //hold
    tetris.hold.draw();


    //board
    tetris.board.draw();

    //timer
    tetris.timer.draw();

    //next
    tetris.next.draw();

    //score
    tetris.score.draw();


    //control falling speed
    if (frameCount % (LEVEL_SPEED[tetris.board.level]) == 0) {
        if (tetris.game.state == RUNNING)
        {
            //auto move pieces down
            tetris.board.move_player(0, 1)
        }
    }


    //do something every second
    if (frameCount % (_frame_rate) == 0) {
        if (tetris.game.state == RUNNING)
        {
            //control timer if time mode is selected
            if (tetris.game.mode == MODE_TIMED)
            {
                tetris.timer.value++
                //console.log("timer value", tetris.timer.value)
                if (tetris.timer.value >= tetris.timer.limit) {
                    //console.log("times up")
                    tetris.game.state = OVER
                    document.querySelector("#menu").style.display = "flex"
                }
            }
        }
    }

    //hold event
    if (tetris.game.state == RUNNING) {
        if (keyIsPressed) {
            if (keyCode == KEY_DOWN) {
                tetris.board.move_player(0, 1)
            }
        }
    }
}



// p5 keypress
function keyPressed() {
    // console.log(keyCode)
    if (tetris.game.state == RUNNING) {
        switch (keyCode) {
            case KEY_LEFT:
                tetris.board.move_player(-1, 0)
                break;
            case KEY_RIGHT:
                tetris.board.move_player(1, 0)
                break;
            case KEY_UP:
                tetris.board.rotate_player()
                break;
            case KEY_DOWN:
                tetris.board.move_player(0, 1)
                break;
            case KEY_SPACE:
                //hard drop
                break;
            case SHIFT:
                //hold key
                tetris.board.save_shape()
                break;
        }

    }
}

function touchStarted() {
    // console.log("touch start",touches[0])
    if (tetris.game.state == RUNNING)
        handle_swipe_lr.start = touches[0]
}
function touchMoved() {
    if (tetris.game.state == RUNNING) {

        handle_swipe_lr.end = touches[0]
        if (handle_swipe_lr.start != null && handle_swipe_lr.end != null) {
            let dx = (handle_swipe_lr.start.x - handle_swipe_lr.end.x)
            if (Math.abs(dx) > handle_swipe_lr.threshold) {
                if (dx < 0) {
                    console.log("moving right", dx)
                    tetris.board.move_player(1, 0)
                }
                if (dx > 0) {
                    console.log("moving left", dx)
                    tetris.board.move_player(-1, 0)
                }
                //reset moved to achieve threshold again
                handle_swipe_lr.start = handle_swipe_lr.end
            }

            let dy = (handle_swipe_lr.start.y - handle_swipe_lr.end.y)
            if (Math.abs(dy) > handle_swipe_lr.threshold / 2) {
                // console.log("dy",dy)
                if (dy < 0) {
                    console.log("moving down", dy)
                    tetris.board.move_player(0, 1)
                }
                //reset moved to achieve threshold again
                handle_swipe_lr.start = handle_swipe_lr.end
            }
        }
    }
}



