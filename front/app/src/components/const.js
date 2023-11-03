import DefaultImage from "../images/employee-default.jpg"

export const SiteName = "Queen of Time"
export const REQUEST_STATUS = {
    START: "START",
    LOADING: "LOADING",
    POST: "POST",
    OK: "OK"
}


export const SliderScales = [
    {
        value: 9,
        label: "9時"
    },
    {
        value: 12,
        label: "12時"
    },
    {
        value: 15,
        label: "15時"
    },
    {
        value: 18,
        label: "18時"
    },
    {
        value: 20,
        label: "20時"
        }
];

export const dayOfWeek = [ "日", "月", "火", "水", "木", "金", "土" ];

export const BUSSINESS_HOUR = (open,close) => 
( {
    early_time: [open,9],
    mid_time: [10, 16],
    late_time: [17,close]
  }
)

//-----------------style-------------------
export const CONFIRMED_COLOR = "green"
export const UNCONFIRMED_COLOR = "gray"

export const BASE_STYLE = {
    backgroundColor: "royalblue",
    color: "white"
}
export const STYLE_2 = {
    backgroundColor: "ivory"
}

export const LIGHT_GRAY = "rgb(130,130,130)"

//--------aws---------------

export const S3_ORIGIN = "https://qot-images.s3.ap-northeast-1.amazonaws.com/"

export const imageSrc = (elm) => (
    elm && (elm.image ? (S3_ORIGIN + elm.image) : DefaultImage)
)