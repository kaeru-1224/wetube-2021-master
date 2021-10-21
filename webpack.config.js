const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BASE_JS = "./src/client/js/";

module.exports = {
  //변경하고자하는 파일
  entry: {
    main: BASE_JS + "main.js",
    videoPlayer: BASE_JS + "videoPlayer.js",
    recoder: BASE_JS + "recoder.js",
    commentSection: BASE_JS + "commentSection.js",
  },
  //MiniCssExtractPlugin:js 파일에서  css를 별개의 파일로 분리해줌
  plugins: [new MiniCssExtractPlugin({ filename: "css/styles.css" })],
  //모드: 개발자 -production이 있는데 production이 더 압축적이며 설치시  디폴트 값으로 되어있다
  mode: "development",
  //watch:true를 통해 어느정도 컴파일을 자동적으로해줌
  watch: true,
  //output:결과값
  //filename: 파일명
  //path: 저장할장소
  output: {
    // 기본 파일이름에 경로명을 추가해서 세부적으로 저장될 위치를 변경해줄 수있다
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        //역순으로 작성하는이유?: 웹펙은 우->좌로 읽히므로
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
