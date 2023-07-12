import React from "react";
import { Image, Alert } from "antd";
import { APIResponse } from "../types";

interface ResultComponentProps {
  selectedOption: APIResponse;
  visible: boolean;
}

export const ResultComponent: React.FC<ResultComponentProps> = ({
  selectedOption,
  visible,
}: ResultComponentProps) => {
  return visible ? (
    <div className="content-body">
      <div>
        <Alert message={selectedOption.weather} type="info" showIcon />
      </div>
      <div className="image">
        <Image width="100%" preview={false} src={selectedOption.image} />
      </div>
    </div>
  ) : null;
};
