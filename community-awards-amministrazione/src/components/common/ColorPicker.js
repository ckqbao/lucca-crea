import { useState } from "react";
import { ChromePicker } from "react-color";

export default function ColorPicker(props) {
  const { onChange, value } = props;

  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="relative">
      <div className="form-control p-2" onClick={() => setShowPicker((prevShowPicker) => !prevShowPicker)}>
        {!!value ? <div style={{ height: '19.5px', background: value }} /> : "Select color"}
      </div>
      {showPicker && (
        <div className="position-absolute z-2">
          <div
            className="position-fixed top-0 start-0 bottom-0 end-0"
            onClick={() => setShowPicker(false)}
          />
          <ChromePicker
            className="absolute"
            color={value}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
}
