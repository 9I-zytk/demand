/**
 * Created by 9I
 * @Date 2019/9/24
 * @description
 */
export function DegToRad (deg) {
  return deg * (Math.PI / 180)
}

export function RadToDeg (deg) {
  return deg * (180 / Math.PI)
}

export function getOffset (canvas, childrenEl) {
  let canv = canvas.getBoundingClientRect()
  let box = childrenEl.getBoundingClientRect()

  return {
    top: box.top - canv.top,
    left: box.left - canv.left,
    width: childrenEl.offsetWidth,
    height: childrenEl.offsetHeight
  }
}

export function getEllipseCoord (r, c, angle) {
  return {
    x: c.x + (r.width / 2) * Math.cos(angle),
    y: c.y + (r.height / 2) * Math.sin(angle)
  }
}

export function getCenterCoord (coods) {
  return {
    x: coods.left + coods.width / 2,
    y: coods.top + (coods.height / 2)
  }
}

export function getAngleCoord (r, c, angle) {
  let x, y
  let rAngle = Math.acos(
    Math.sqrt(Math.pow(r.left + r.width - c.x, 2)) /
    Math.sqrt(Math.pow(r.left + r.width - c.x, 2) + Math.pow(r.top - c.y, 2))
  )

  if (angle >= 2 * Math.PI - rAngle || angle < rAngle) {
    x = r.left + r.width
    y = c.y + Math.tan(angle) * (r.left + r.width - c.x)
  } else if (angle >= rAngle && angle < Math.PI - rAngle) {
    x = c.x - ((r.top - c.y) / Math.tan(angle))
    y = r.top + r.height
  } else if (angle >= Math.PI - rAngle && angle < Math.PI + rAngle) {
    x = r.left
    y = c.y - Math.tan(angle) * (r.left + r.width - c.x)
  } else if (angle >= Math.PI + rAngle) {
    x = c.x + ((r.top - c.y) / Math.tan(angle))
    y = r.top
  }
  return {
    x: x,
    y: y
  }
}

export function getSideCoord (coods, side) {
  let x = 0
  let y = 0

  switch (side) {
    case 'top':
      x = coods.left + (coods.width / 2)
      y = coods.top
      break
    case 'right':
      x = coods.left + coods.width
      y = coods.top + (coods.height / 2)
      break
    case 'bottom':
      x = coods.left + (coods.width / 2)
      y = coods.top + coods.height
      break
    case 'left':
      x = coods.left
      y = coods.top + (coods.height / 2)
      break
    default: // def: bottom
      x = coods.left + (coods.width / 2)
      y = coods.top + coods.height
      break
  }
  return {x: x, y: y}
}

export function generateHashId (count = 6, prefix = 'layer') {
  return prefix + '-' + Math.random()
    .toString(36)
    .substr(count)
}
