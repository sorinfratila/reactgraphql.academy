import React from 'react'
import styled from 'styled-components'
import Box from '../layout/Box'

const ExternalLinkIcon = props => (
  <svg height={26} width={25} {...props}>
    <g fillRule="evenodd">
      <path d="M24.036 0a.951.951 0 0 0-.104.01h-7.366a.907.907 0 0 0-.67.288c-.18.188-.28.444-.28.711s.1.523.28.711c.177.188.42.291.67.288h5.23L10.287 14.28h-.001a1.03 1.03 0 0 0-.287.71 1.03 1.03 0 0 0 .274.716c.178.19.42.295.67.293a.913.913 0 0 0 .666-.306L23.118 3.42v5.578l.001-.001c-.004.267.094.525.27.715.175.191.416.297.666.297s.49-.106.666-.297c.177-.19.274-.448.27-.715v-7.86a1.044 1.044 0 0 0-.23-.805.911.911 0 0 0-.725-.332z" />
      <path d="M10.5 4c-2.383 0-4.183-.004-5.617.166s-2.584.528-3.405 1.389C.658 6.416.32 7.617.158 9.12-.001 10.622 0 12.507 0 15c0 2.494-.002 4.38.162 5.883.165 1.502.51 2.703 1.333 3.565.823.86 1.97 1.217 3.403 1.386 1.433.17 3.229.166 5.602.166s4.169.001 5.602-.17c1.433-.171 2.582-.53 3.404-1.39.823-.861 1.165-2.062 1.33-3.565C21 19.373 21 17.49 21 15.001V15a1.029 1.029 0 0 0-.275-.717c-.18-.19-.424-.297-.68-.297s-.5.107-.68.297a1.029 1.029 0 0 0-.274.717c0 2.487-.009 4.342-.152 5.648s-.405 1.982-.782 2.377-1.023.67-2.27.819c-1.247.149-3.016.156-5.388.156s-4.142-.006-5.389-.154c-1.246-.147-1.892-.42-2.269-.815s-.64-1.07-.783-2.377c-.143-1.307-.151-3.162-.151-5.653 0-2.493.005-4.349.145-5.656.14-1.308.402-1.983.776-2.375s1.019-.666 2.267-.815c1.248-.148 3.021-.154 5.403-.154L10.5 6c.255.004.502-.1.684-.288.182-.188.284-.444.284-.712 0-.267-.102-.524-.284-.712A.933.933 0 0 0 10.5 4z" />
    </g>
  </svg>
)

const StyledExternalLinkIcon = styled(Box)``
StyledExternalLinkIcon.defaultProps = {
  box: ExternalLinkIcon,
}

export default StyledExternalLinkIcon
