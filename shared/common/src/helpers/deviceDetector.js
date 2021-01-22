const userAgent = navigator.userAgent.toLowerCase();
export const isDesktop = -1 < userAgent.indexOf('electron');
export const isMobile = -1 < userAgent.indexOf('android');
