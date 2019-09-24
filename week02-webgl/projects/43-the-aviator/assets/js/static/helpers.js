export const COLORS = {
  red: 0x00FEFF, // 0x00FEFF red=0xf25346
  white: 0xd8d0d1,
  brown: 0x59332e,
  pink: 0xF5986E,
  brownDark: 0x23190f,
  blue: 0x68c3c0,
};

export const randomBetween = (min, max) => {
  return Math.random() * (max - min) + min;
}

export const randomBetweenInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const normalize = (v, vmin, vmax, tmin, tmax) => {
  const nv = Math.max(Math.min(v, vmax), vmin);
  const dv = vmax - vmin;
  const pc = (nv - vmin) / dv;
  const dt = tmax - tmin;
  const tv = tmin + (pc * dt);
  return tv;
}