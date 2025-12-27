import React, { useState, useEffect } from "react";
import {
  parseColorString,
  formatRgbString,
  formatRgbaString,
  formatHslString,
  formatHsbString,
  formatCmykString,
} from "./colorConverter";
import { copyToClipboard } from "./colorUtils";
import { useColor } from "./ColorContext";
import "./ColorConverter.css";

interface ColorConverterProps {
  initialColor?: string;
  onColorChange?: (color: string) => void;
}

interface ColorFormats {
  hex: string;
  rgb: string;
  rgba: string;
  hsl: string;
  hsb: string;
  cmyk: string;
}

const ColorConverter: React.FC<ColorConverterProps> = ({ onColorChange }) => {
  // 使用颜色上下文
  const { selectedColor, setSelectedColor } = useColor();

  const [inputValue, setInputValue] = useState(selectedColor);
  const [parsedColor, setParsedColor] = useState<ColorFormats | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  // 监听输入值变化，更新颜色
  useEffect(() => {
    const parsed = parseColorString(inputValue);
    if (parsed) {
      setParsedColor({
        hex: parsed.hex,
        rgb: formatRgbString(parsed.rgb),
        rgba: formatRgbaString(parsed.rgba),
        hsl: formatHslString(parsed.hsl),
        hsb: formatHsbString(parsed.hsb),
        cmyk: formatCmykString(parsed.cmyk),
      });

      // 更新全局颜色
      setSelectedColor(parsed.hex);

      if (onColorChange) {
        onColorChange(parsed.hex);
      }
    } else {
      setParsedColor(null);
    }
  }, [inputValue, onColorChange, setSelectedColor]);

  // 监听全局颜色变化，更新输入值
  useEffect(() => {
    if (selectedColor !== inputValue) {
      setInputValue(selectedColor);
    }
  }, [selectedColor]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFormatChange = (_format: keyof ColorFormats, value: string) => {
    setInputValue(value);
  };

  const copyToClipboardHandler = async (text: string, format: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2000);
    }
  };

  const formatConfig = [
    { key: "hex", label: "HEX", placeholder: "#RRGGBB" },
    { key: "rgb", label: "RGB", placeholder: "rgb(255, 0, 0)" },
    { key: "rgba", label: "RGBA", placeholder: "rgba(255, 0, 0, 1)" },
    { key: "hsl", label: "HSL", placeholder: "hsl(0, 100%, 50%)" },
    { key: "hsb", label: "HSB", placeholder: "hsb(0, 100%, 100%)" },
    { key: "cmyk", label: "CMYK", placeholder: "cmyk(0%, 100%, 100%, 0%)" },
  ] as const;

  return (
    <div className="color-converter">
      <div className="converter-header">
        <h3>颜色格式转换器</h3>
        <div
          className="color-preview-box"
          style={{ backgroundColor: parsedColor?.hex || "#000000" }}
        />
      </div>

      <div className="converter-input">
        <label htmlFor="colorInput">输入颜色值:</label>
        <input
          id="colorInput"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="输入HEX、RGB、HSL、HSB或CMYK格式的颜色值"
          className="color-input"
        />
        <div className="input-status">
          {parsedColor ? (
            <span className="status-valid">✓ 有效颜色</span>
          ) : (
            <span className="status-invalid">✗ 无效格式</span>
          )}
        </div>
      </div>

      <div className="converter-formats">
        {formatConfig.map(({ key, label, placeholder }) => (
          <div key={key} className="format-row">
            <div className="format-label">
              <strong>{label}:</strong>
            </div>
            <div className="format-input-group">
              <input
                type="text"
                value={parsedColor?.[key] || ""}
                onChange={(e) => handleFormatChange(key, e.target.value)}
                placeholder={placeholder}
                className={`format-input ${!parsedColor ? "disabled" : ""}`}
                disabled={!parsedColor}
              />
              <button
                className="copy-btn"
                onClick={() =>
                  parsedColor && copyToClipboardHandler(parsedColor[key], key)
                }
                disabled={!parsedColor}
                title={`复制${label}值`}
              >
                {copiedFormat === key ? "✓" : "📋"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {parsedColor && (
        <div className="converter-info">
          <div className="info-row">
            <span className="info-label">颜色预览:</span>
            <div className="color-samples">
              <div
                className="color-sample"
                style={{ backgroundColor: parsedColor.hex }}
                title={parsedColor.hex}
              />
              <div
                className="color-sample"
                style={{ backgroundColor: parsedColor.rgb }}
                title={parsedColor.rgb}
              />
              <div
                className="color-sample"
                style={{ backgroundColor: parsedColor.hsl }}
                title={parsedColor.hsl}
              />
            </div>
          </div>
        </div>
      )}

      {copiedFormat && (
        <div className="copy-notification">
          已复制 {copiedFormat.toUpperCase()} 值到剪贴板
        </div>
      )}
    </div>
  );
};

export default ColorConverter;
