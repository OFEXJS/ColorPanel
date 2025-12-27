import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import ColorPicker from "./ColorPicker";
import { presetColors, brandColors } from "./colorUtils";
import { useColor } from "./ColorContext";
import "./ColorPanel.css";

interface ColorPanelProps {
  initialColor?: string;
  onChange?: (color: string) => void;
  disabled?: boolean;
}

const ColorPanel: React.FC<ColorPanelProps> = ({
  initialColor,
  onChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [position, setPosition] = useState({ top: 20, left: 20 });
  const panelRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  
  // 使用颜色上下文
  const { selectedColor, setSelectedColor } = useColor();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isClickInside = panelRef.current?.contains(event.target as Node) || 
                          dropdownRef.current?.contains(event.target as Node);
      if (!isClickInside) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    if (onChange) {
      onChange(color);
    }
  };

  const handlePresetColorClick = (color: string) => {
    handleColorChange(color);
  };

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  // 拖拽相关事件处理
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX - position.left,
      y: e.clientY - position.top
    };
    
    // 添加全局事件监听
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    
    const newPosition = {
      top: e.clientY - dragStartRef.current.y,
      left: e.clientX - dragStartRef.current.x
    };
    
    setPosition(newPosition);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const openPanel = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  // 清理拖拽事件监听器
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // 创建颜色面板的Portal容器
  const dropdownContainer = document.createElement('div');
  dropdownContainer.className = 'color-panel-dropdown';

  return (
    <div className="color-panel" ref={panelRef}>
      {/* 色块预览 - 点击打开面板 */}
      <div
        className={`color-swatch-trigger ${disabled ? 'disabled' : ''}`}
        style={{ backgroundColor: selectedColor }}
        onClick={openPanel}
        title={disabled ? "颜色选择器已禁用" : "点击打开颜色选择器"}
      />
      
      {/* 颜色面板弹窗 - 使用Portal渲染到document.body */}
      {isOpen && ReactDOM.createPortal(
        <div 
          className="color-panel-dropdown" 
          ref={dropdownRef}
          style={{ 
            top: `${position.top}px`, 
            left: `${position.left}px`,
            right: 'auto' // 覆盖默认的right样式，使用left定位
          }}
        >
          <div 
            className="color-panel-header" 
            ref={headerRef}
            onMouseDown={handleMouseDown}
            style={{ cursor: 'move' }}
          >
            <h3>颜色选择器</h3>
            <button
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="关闭"
            >
              ×
            </button>
          </div>

          <div className="color-panel-content">
            {/* 主要颜色选择器 */}
            <div className="color-picker-section">
              <ColorPicker
                initialColor={selectedColor}
                onChange={handleColorChange}
              />
            </div>

            {/* 预设颜色手风琴 */}
            <div className="preset-colors-section">
              {/* 基础颜色手风琴 */}
              <div className="accordion-item">
                <button
                  className="accordion-header"
                  onClick={() => toggleAccordion('preset')}
                >
                  <span>基础颜色</span>
                  <span className={`accordion-arrow ${activeAccordion === 'preset' ? 'open' : ''}`}>
                    ▼
                  </span>
                </button>
                {activeAccordion === 'preset' && (
                  <div className="accordion-content">
                    <div className="color-grid">
                      {presetColors.map((color) => (
                        <div
                          key={color.value}
                          className="color-grid-item"
                          style={{ backgroundColor: color.value }}
                          onClick={() => handlePresetColorClick(color.value)}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 品牌颜色手风琴 */}
              <div className="accordion-item">
                <button
                  className="accordion-header"
                  onClick={() => toggleAccordion('brand')}
                >
                  <span>品牌颜色</span>
                  <span className={`accordion-arrow ${activeAccordion === 'brand' ? 'open' : ''}`}>
                    ▼
                  </span>
                </button>
                {activeAccordion === 'brand' && (
                  <div className="accordion-content">
                    <div className="color-grid">
                      {brandColors.map((color) => (
                        <div
                          key={color.value}
                          className="color-grid-item"
                          style={{ backgroundColor: color.value }}
                          onClick={() => handlePresetColorClick(color.value)}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ColorPanel;