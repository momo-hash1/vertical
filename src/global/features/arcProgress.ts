function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  }
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  var start = polarToCartesian(x, y, radius, endAngle - 0.0001)
  var end = polarToCartesian(x, y, radius, startAngle)

  var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

  var d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ')

  return d
}
const renderArc = (el: HTMLElement, angle: number, radius: number, strokeWidth = 2) => {
  el.setAttribute('d', describeArc(radius, radius, radius - strokeWidth, 360 - angle, 360))
}
const renderFilledArc = (el: HTMLElement, angle: number, radius: number) => {
  el.setAttribute('d', describeArc(radius * 2, radius * 2, radius, 0,360 - angle))
}

export { renderArc, renderFilledArc }
