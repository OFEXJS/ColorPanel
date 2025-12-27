import React, { createContext, useState, useContext, ReactNode } from 'react';

// 定义颜色上下文的类型
interface ColorContextType {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

// 创建颜色上下文
const ColorContext = createContext<ColorContextType | undefined>(undefined);

// 颜色上下文提供者组件的props类型
interface ColorProviderProps {
  children: ReactNode;
  initialColor?: string;
}

// 颜色上下文提供者组件
export const ColorProvider: React.FC<ColorProviderProps> = ({ 
  children, 
  initialColor = '#007bff' 
}) => {
  const [selectedColor, setSelectedColor] = useState<string>(initialColor);

  return (
    <ColorContext.Provider value={{ selectedColor, setSelectedColor }}>
      {children}
    </ColorContext.Provider>
  );
};

// 自定义钩子，用于在组件中使用颜色上下文
export const useColor = () => {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error('useColor must be used within a ColorProvider');
  }
  return context;
};