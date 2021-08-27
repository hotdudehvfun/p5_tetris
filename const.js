const RUNNING = 1 //game is running
const NEVER_STARTED = 2 //game was never started
const PAUSED = 3 //game was running now paused
const OVER = 4 // game was player now over
const MODE_ENDLESS=1,MODE_TIMED=2
const NO_LINES = 0, SINGLE = 1, DOUBLE = 2, TRIPLE = 3, TETRIS = 4;
const
    SHAPE_EMPTY = 0,
    SHAPE_L = 40,
    SHAPE_J = 50,
    SHAPE_O = 60,
    SHAPE_I = 70,
    SHAPE_S = 80,
    SHAPE_Z = 90,
    SHAPE_T = 100;

const POINTS_BAG = []
POINTS_BAG[NO_LINES] = 4
POINTS_BAG[SINGLE] = 10
POINTS_BAG[DOUBLE] = 30
POINTS_BAG[TRIPLE] = 50
POINTS_BAG[TETRIS] = 80

POINTS_BAG[NO_LINES + SHAPE_T] = 4
POINTS_BAG[SINGLE + SHAPE_T] = 80
POINTS_BAG[DOUBLE + SHAPE_T] = 120
POINTS_BAG[TRIPLE + SHAPE_T] = 160
const COMBO = 2



const UP = 11,
    RIGHT = 12,
    DOWN = 13,
    LEFT = 14;

const ROTATION_ARRAY = [
    UP,
    RIGHT,
    DOWN,
    LEFT
]

const KEY_LEFT = 37,
    KEY_UP = 38,
    KEY_RIGHT = 39,
    KEY_DOWN = 40,
    KEY_SPACE = 32,
    KEY_ENTER = 13;


const EMPTY = 0,
    FILLED = 1;

const COLORS =
{
    GRAY_50: "#F9FAFB",
    GRAY_100: "#F3F4F6",
    GRAY_200: "#E5E7EB",
    GRAY_300: "#D1D5DB",
    GRAY_400: "#9CA3AF",
    GRAY_500: "#6B7280",
    GRAY_600: "#4B5563",
    GRAY_700: "#374151",
    GRAY_800: "#1F2937",
    GRAY_900: "#111827",
    RED_50: "#FEF2F2",
    RED_100: "#FEE2E2",
    RED_200: "#FECACA",
    RED_300: "#FCA5A5",
    RED_400: "#F87171",
    RED_500: "#EF4444",
    RED_600: "#DC2626",
    RED_700: "#B91C1C",
    RED_800: "#991B1B",
    RED_900: "#7F1D1D",
    YELLOW_50: "#FFFBEB",
    YELLOW_100: "#FEF3C7",
    YELLOW_200: "#FDE68A",
    YELLOW_300: "#FCD34D",
    YELLOW_400: "#FBBF24",
    YELLOW_500: "#F59E0B",
    YELLOW_600: "#D97706",
    YELLOW_700: "#B45309",
    YELLOW_800: "#92400E",
    YELLOW_900: "#78350F",
    GREEN_50: "#ECFDF5",
    GREEN_100: "#D1FAE5",
    GREEN_200: "#A7F3D0",
    GREEN_300: "#6EE7B7",
    GREEN_400: "#34D399",
    GREEN_500: "#10B981",
    GREEN_600: "#059669",
    GREEN_700: "#047857",
    GREEN_800: "#065F46",
    GREEN_900: "#064E3B",
    BLUE_50: "#EFF6FF",
    BLUE_100: "#DBEAFE",
    BLUE_200: "#BFDBFE",
    BLUE_300: "#93C5FD",
    BLUE_400: "#60A5FA",
    BLUE_500: "#3B82F6",
    BLUE_600: "#2563EB",
    BLUE_700: "#1D4ED8",
    BLUE_800: "#1E40AF",
    BLUE_900: "#1E3A8A",
    INDIGO_50: "#EEF2FF",
    INDIGO_100: "#E0E7FF",
    INDIGO_200: "#C7D2FE",
    INDIGO_300: "#A5B4FC",
    INDIGO_400: "#818CF8",
    INDIGO_500: "#6366F1",
    INDIGO_600: "#4F46E5",
    INDIGO_700: "#4338CA",
    INDIGO_800: "#3730A3",
    INDIGO_900: "#312E81",
    PURPLE_50: "#F5F3FF",
    PURPLE_100: "#EDE9FE",
    PURPLE_200: "#DDD6FE",
    PURPLE_300: "#C4B5FD",
    PURPLE_400: "#A78BFA",
    PURPLE_500: "#8B5CF6",
    PURPLE_600: "#7C3AED",
    PURPLE_700: "#6D28D9",
    PURPLE_800: "#5B21B6",
    PURPLE_900: "#4C1D95",
    PINK_50: "#FDF2F8",
    PINK_100: "#FCE7F3",
    PINK_200: "#FBCFE8",
    PINK_300: "#F9A8D4",
    PINK_400: "#F472B6",
    PINK_500: "#EC4899",
    PINK_600: "#DB2777",
    PINK_700: "#BE185D",
    PINK_800: "#9D174D",
    PINK_900: "#831843"
}

const CELL_COLOR_CODE =
{
    1:
    {
        "code": 1,
        "b": COLORS.RED_400,
        "s": COLORS.RED_800,
        "r": COLORS.RED_600
    },
    2:
    {
        "code": 2,
        "b": COLORS.BLUE_400,
        "s": COLORS.BLUE_600,
        "r": COLORS.BLUE_800
    }
    ,
    3:
    {
        "code": 3,
        "b": COLORS.GREEN_400,
        "s": COLORS.GREEN_600,
        "r": COLORS.GREEN_800
    }
    ,
    4:
    {
        "code": 4,
        "b": COLORS.INDIGO_400,
        "s": COLORS.INDIGO_600,
        "r": COLORS.INDIGO_800
    }
    ,
    5:
    {
        "code": 5,
        "b": COLORS.PINK_400,
        "s": COLORS.PINK_600,
        "r": COLORS.PINK_800
    }
    ,
    6:
    {
        "code": 6,
        "b": COLORS.PURPLE_400,
        "s": COLORS.PURPLE_600,
        "r": COLORS.PURPLE_800
    }
}



var SHAPE_O_ARRAY_UP =
    [
        [1, 1],
        [1, 1]
    ];

//----------------------
var SHAPE_L_ARRAY_UP =
    [
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 0]
    ];

var SHAPE_L_ARRAY_RIGHT =
    [
        [1, 1, 1],
        [1, 0, 0],
        [0, 0, 0],

    ];

var SHAPE_L_ARRAY_DOWN =
    [
        [0, 1, 1],
        [0, 0, 1],
        [0, 0, 1]
    ];

var SHAPE_L_ARRAY_LEFT =
    [

        [0, 0, 0],
        [0, 0, 1],
        [1, 1, 1]
    ];
//----------------------
//----------------------
var SHAPE_J_ARRAY_UP =
    [
        [0, 0, 1],
        [0, 0, 1],
        [0, 1, 1]
    ];

var SHAPE_J_ARRAY_RIGHT =
    [
        [0, 0, 0],
        [1, 0, 0],
        [1, 1, 1]
    ];

var SHAPE_J_ARRAY_DOWN =
    [
        [1, 1, 0],
        [1, 0, 0],
        [1, 0, 0]
    ];

var SHAPE_J_ARRAY_LEFT =
    [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 0],

    ];
//----------------------
//----------------------
var SHAPE_I_ARRAY_UP =
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ];

var SHAPE_I_ARRAY_RIGHT =
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
//----------------------
//----------------------
var SHAPE_S_ARRAY_UP =
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ];

var SHAPE_S_ARRAY_RIGHT =
    [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0]
    ];
//----------------------
//----------------------
var SHAPE_Z_ARRAY_UP =
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]

    ];

var SHAPE_Z_ARRAY_RIGHT =
    [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0]
    ];
//----------------------
var SHAPE_T_ARRAY_UP =
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],

    ];

var SHAPE_T_ARRAY_RIGHT =
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0]
    ];

var SHAPE_T_ARRAY_DOWN =
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
    ];

var SHAPE_T_ARRAY_LEFT =
    [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0]
    ];



var PIECE_TO_USE = [];
//shape l array refernce
PIECE_TO_USE[SHAPE_L + UP] = SHAPE_L_ARRAY_UP;
PIECE_TO_USE[SHAPE_L + RIGHT] = SHAPE_L_ARRAY_RIGHT;
PIECE_TO_USE[SHAPE_L + DOWN] = SHAPE_L_ARRAY_DOWN;
PIECE_TO_USE[SHAPE_L + LEFT] = SHAPE_L_ARRAY_LEFT;

//shape j array refernce
PIECE_TO_USE[SHAPE_J + UP] = SHAPE_J_ARRAY_UP;
PIECE_TO_USE[SHAPE_J + RIGHT] = SHAPE_J_ARRAY_RIGHT;
PIECE_TO_USE[SHAPE_J + DOWN] = SHAPE_J_ARRAY_DOWN;
PIECE_TO_USE[SHAPE_J + LEFT] = SHAPE_J_ARRAY_LEFT;

//shape o array refernce
PIECE_TO_USE[SHAPE_O + UP] = SHAPE_O_ARRAY_UP;
PIECE_TO_USE[SHAPE_O + RIGHT] = SHAPE_O_ARRAY_UP;
PIECE_TO_USE[SHAPE_O + DOWN] = SHAPE_O_ARRAY_UP;
PIECE_TO_USE[SHAPE_O + LEFT] = SHAPE_O_ARRAY_UP;

//shape I array refernce
PIECE_TO_USE[SHAPE_I + UP] = SHAPE_I_ARRAY_UP;
PIECE_TO_USE[SHAPE_I + RIGHT] = SHAPE_I_ARRAY_RIGHT;
PIECE_TO_USE[SHAPE_I + DOWN] = SHAPE_I_ARRAY_UP;
PIECE_TO_USE[SHAPE_I + LEFT] = SHAPE_I_ARRAY_RIGHT;

//shape s array refernce
PIECE_TO_USE[SHAPE_S + UP] = SHAPE_S_ARRAY_UP;
PIECE_TO_USE[SHAPE_S + RIGHT] = SHAPE_S_ARRAY_RIGHT;
PIECE_TO_USE[SHAPE_S + DOWN] = SHAPE_S_ARRAY_UP;
PIECE_TO_USE[SHAPE_S + LEFT] = SHAPE_S_ARRAY_RIGHT;

//shape z array refernce
PIECE_TO_USE[SHAPE_Z + UP] = SHAPE_Z_ARRAY_UP;
PIECE_TO_USE[SHAPE_Z + RIGHT] = SHAPE_Z_ARRAY_RIGHT;
PIECE_TO_USE[SHAPE_Z + DOWN] = SHAPE_Z_ARRAY_UP;
PIECE_TO_USE[SHAPE_Z + LEFT] = SHAPE_Z_ARRAY_RIGHT;

//shape t array refernce
PIECE_TO_USE[SHAPE_T + UP] = SHAPE_T_ARRAY_UP;
PIECE_TO_USE[SHAPE_T + RIGHT] = SHAPE_T_ARRAY_RIGHT;
PIECE_TO_USE[SHAPE_T + DOWN] = SHAPE_T_ARRAY_DOWN;
PIECE_TO_USE[SHAPE_T + LEFT] = SHAPE_T_ARRAY_LEFT;


//adding function to array to remove
//args: item to remove
//return new array
Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};



//check if point inside rect
function is_point_inside_coordinates(x1, y1, x2,y2, x, y)
{
    if (x > x1 && x < x2 && y > y1 && y < y2)
        return true;

    return false;
}

function is_point_inside_rect(x, y,w,h, px, py)
{
    let x1,y1,x2,y2
    x1=x
    y1=x1+h
    x2=x+w
    y2=y
    return is_point_inside_coordinates(x1,y1,x2,y2,px,py)
}
function percent(v, p) {
    return v * p / 100;
}