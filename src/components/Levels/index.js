import React from "react";
import { Stepper } from "react-form-stepper";

const Levels = ({ levelNames, quizLevel }) => {
  return (
    <div className="levelsContainer" style={{ background: "transparent" }}>
      <Stepper
        style={{ width: "100%" }}
        steps={[
          { label: "DEBUTANT" },
          { label: "CONFIRME" },
          { label: "EXPERT" },
        ]}
        activeStep={quizLevel}
      />
    </div>
  );
};

export default Levels;
