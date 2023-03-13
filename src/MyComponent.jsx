import React, { useState } from 'react';
import { Widget } from '@typeform/embed-react';
import { Steps, Button, message } from 'antd';

const MyComponent = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Step 1',
      content: <Widget id="i7snOA2h" style={{ width: 1500 , height: 500 }} className="my-form" />,
    },
    {
      title: 'Step 2',
      content: <Widget id="YmeWiMzN" style={{ width: 1500 , height: 500 }} className="my-form" />,
    },
    {
      title: 'Step 3',
      content: <Widget id="rphHdTUl" style={{ width: 1500 , height: 500 }} className="my-form" />,
    },
  ];

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
   <div style={{ display: 'flex', flexDirection: 'column' }}>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', marginBottom: '20px' }}>
    <h1 style={{ margin: 0 }}>Form</h1>
    <div style={{ display: 'flex' }}>
      {currentStep > 0 && (
        <Button style={{ marginRight: '8px' }} onClick={handlePrev}>
          Prev
        </Button>
      )}
      {currentStep < steps.length - 1 && (
        <Button type="primary" onClick={handleNext}>
          Next
        </Button>
      )}
      {currentStep === steps.length - 1 && (
        <Button type="primary" onClick={() => message.success('Processing complete!')}>
          Done
        </Button>
      )}
    </div>
  </div>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
    <div>
      <Steps current={currentStep} style={{ marginBottom: '30px' }}>
        {steps.map((step) => (
          <Steps.Step key={step.title} title={step.title} />
        ))}
      </Steps>
      <div>{steps[currentStep].content}</div>
    </div>
  </div>
</div>

  );
};

export default MyComponent;
