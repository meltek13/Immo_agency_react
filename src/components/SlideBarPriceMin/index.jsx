import React, {useState} from 'react'
import { Slider, InputNumber, Row, Col } from 'antd';
import 'antd/dist/antd.css';

const IntegerStep = ({onchange, value}) => {
  
   
    const [inputValueMin, setInputValueMin] = useState(1)
    const [inputValueMax, setInputValueMax] = useState(1000000)

    const onChangeMin = (e) => {
        setInputValueMin(e)
    
    };

    const onChangeMax = (e) => {
        setInputValueMax(e)
     
    };

      return (
          
        <Row>
          <Col span={12}>
            <Slider
              min={1}
              max={1000000}
              onChange={onchange}
              value={typeof value === 'number' ? value : 0}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={1}
              max={1000000}
              style={{ margin: '0 16px'}}
              value={value}
              onChange={onchange}
            />
          </Col>
          <p>€/minimum</p>
        </Row>
         
      );
    }
  

  export default IntegerStep
