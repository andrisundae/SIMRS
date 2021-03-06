export const splashTemplate = (config) => {
  config = {
    logo:
      'https://upload.wikimedia.org/wikipedia/commons/d/dd/Microsoft_Office_2013_logo.svg',
    brand: 'Linkar',
    productName: 'SIMRS',
    text: 'Initializing ...',
    website: 'www.website.com',
    color: '#5c97bd',
    ...config,
  };
  return `
<!DOCTYPE html>
<meta charset="utf-8">
<html>
<head>
  <style>
    body,
    html {
      margin: 0;
      overflow: hidden;
    }
    #box {
      position: absolute;
      user-select: none;
      width: 100%;
      height: 100%;
      overflow: hidden;
      margin: auto;
    }
    #logo {
      height: 16px;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: 25px;
      left: 25px;
    }
    #logo img {
      width: 18px;
      -webkit-filter: grayscale(100%) brightness(5);
      filter: grayscale(100%) brightness(5);
    }
    #logo h6 {
      color: white;
      font-size: 16px;
      font-weight: 200;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      letter-spacing: 0px;
      margin-left: 5px;
    }
    #box h2 {
      color: white;
      display: inline-block;
      font-size: 42px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-120%);
    }
    #box .text {
      color: white;
      font-weight: 400;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
    #box h4 {
      font-size: 12px;
      font-weight: 400;
      opacity: 50%;
    }
    #starting-txt {
      position: absolute;
      left: 25px;
      bottom: 13px;
    }
    #author-txt {
      position: absolute;
      right: 25px;
      bottom: 13px;
    }
    #author-txt a {
      color: inherit;
      text-decoration: none;
    }
    .text img {
      width: 15px;
    }
    .dot {
      width: 4px;
      height: 4px;
      top: 50%;
      left: -20%;
      transform: translateY(40px);
      position: absolute;
      margin: auto;
      border-radius: 5px;
      background: white;
    }
    #dot1 {
      animation: dotslide 2.8s infinite cubic-bezier(0.2, .8, .8, 0.2);
    }
    #dot2 {
      animation: dotslide 2.8s .2s infinite cubic-bezier(0.2, .8, .8, 0.2);
    }
    #dot3 {
      animation: dotslide 2.8s .4s infinite cubic-bezier(0.2, .8, .8, 0.2);
    }
    #dot4 {
      animation: dotslide 2.8s .6s infinite cubic-bezier(0.2, .8, .8, 0.2);
    }
    #dot5 {
      animation: dotslide 2.8s .8s infinite cubic-bezier(0.2, .8, .8, 0.2);
    }
    @keyframes dotslide {
      0% {
        left: -20%;
      }
      100% {
        left: 120%;
      }
    }
  </style>
</head>
<body style="background-color: #32c5d2;
  background: linear-gradient(to right, ${config.color}, #32c5d2);">
  <div id="box" style="background-color: #32c5d2;
  background: linear-gradient(to right, ${config.color}, #32c5d2);">
    <span id="logo">
      <img id="logo-img" src="${config.logo}" />
      <h6 id="logo-text">${config.brand}</h6>
    </span>
    <h2 id="product" class="text">${config.productName}</h2>
    <div class="dot" id="dot1"></div>
    <div class="dot" id="dot2"></div>
    <div class="dot" id="dot3"></div>
    <div class="dot" id="dot4"></div>
    <div class="dot" id="dot5"></div>
    <h4 class="text" id="starting-txt">${config.text}</h4>
    <h4 class="text" id="author-txt">${config.website}</h4>
  </div>
</body>
</html>
`;
};
