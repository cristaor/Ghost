import React from 'react';

const Button = ({
  size = 'md',
  label = '',
  icon = '',
  iconColorClass = 'text-black',
  color = 'clear',
  fullWidth,
  link,
  disabled,
  onClick,
  className = '',
  ...props
}) => {
    const colorClasses = {
        black: link ? 'text-black hover:text-grey-800' : 'bg-black text-white hover:bg-grey-900',
        grey: link ? 'text-black hover:text-grey-800' : 'bg-grey-100 text-black hover:!bg-grey-300',
        green: link ? 'text-green hover:text-green-400' : 'bg-green text-white hover:bg-green-400',
        red: link ? 'text-red hover:text-red-400' : 'bg-red text-white hover:bg-red-400',
        white: link ? 'text-white hover:text-white' : 'bg-white text-black',
        clear: link ? 'text-black hover:bg-grey-200' : 'text-black hover:bg-grey-200',
      };
    
      // Construcción de las clases CSS
      const getButtonStyles = () => {
        let styles = 'transition whitespace-nowrap flex items-center justify-center rounded-sm text-sm';
    
        if (link) {
          styles += ' font-bold';
        } else {
          styles += size === 'sm' ? ' px-3 h-7' : ' px-4 h-[34px]';
        }
    
        styles += colorClasses[color] || colorClasses.clear;
    
        if (fullWidth && !link) {
          styles += ' w-full';
        }
    
        if (disabled) {
          styles += ' opacity-40';
        } else {
          styles += ' cursor-pointer';
        }
    
        styles += ` ${className}`;
    
        return styles;
      };

  return (
    <button
      className={getButtonStyles()}
      disabled={disabled}
      type="button"
      onClick={onClick}
      {...props}
    >
      {icon && <Icon colorClass={iconColorClass} name={icon} size={size === 'sm' ? 'sm' : 'md'} />}
      {label}
    </button>
  );
};

export default Button;
