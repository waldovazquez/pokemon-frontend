function SampleNextArrow({
  className,
  style,
  onClick,
}) {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2B2D42',
        borderRadius: '14px',
        width: '30px',
        height: '30px',
        right: '-35px',
      }}
      onClick={onClick}
    />
  );
}

export default SampleNextArrow;
