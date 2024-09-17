import React, { useState } from 'react';
import { Form, Input, Select, Space, Button } from 'antd';
import { commonPostMethod } from '../api/serverApi';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import './segment.scss';

const { Option } = Select;

const schemaOptions = [
  { label: 'FirstName', value: 'first_name' },
  { label: 'LastName', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'AccountName', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];

const useSegmentForm = ({ onSave, onClose }) => {
  const [form] = Form.useForm();
  const [selectedSchemas, setSelectedSchemas] = useState([{ value: '' }]);

  const handleSchemaChange = (value, index) =>
    setSelectedSchemas(
      selectedSchemas.map((schema, i) => (i === index ? { value } : schema))
    );

  const addSchema = () => setSelectedSchemas([...selectedSchemas, { value: '' }]);
  const removeSchema = (index) =>
    setSelectedSchemas(selectedSchemas.filter((_, i) => i !== index));

  const onFinish = async (values) => {
    const schemaData = selectedSchemas?.map(({ value }) => ({
      [value]: schemaOptions?.find((option) => option.value === value)?.label,
    }));

    const payload = {
      segment_name: values.segmentName,
      schema: schemaData,
    };
    onSave(payload);

    try {
      const response = await commonPostMethod('/saveSegment', payload);
    } catch (error) {
      console.error('Error saving segment:', error);
    }
  };

  const onCancel = () => {
    form.resetFields();
    setSelectedSchemas([{ label: '', value: '' }]);
    onClose();
  };

  return {
    form,
    selectedSchemas,
    handleSchemaChange,
    addSchema,
    removeSchema,
    onFinish,
    onCancel,
  };
};

const SegmentForm = ({ onSave, onClose }) => {
  const {
    form,
    selectedSchemas,
    handleSchemaChange,
    addSchema,
    removeSchema,
    onFinish,
    onCancel,
  } = useSegmentForm({ onSave, onClose });

  return (
    <Form form={form} onFinish={onFinish} className="segment-form">
      <Form.Item
        label="Enter the Name of the Segment"
        name="segmentName"
        rules={[{ required: true, message: 'Please enter the segment name' }]}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input placeholder="Enter the Name of the Segment" />
      </Form.Item>

      <div>
        <p>To save your segment, you need to add the schemas to build the query.</p>
      </div>

      <div className="schema-section">
        {selectedSchemas.map((schema, index) => (
          <Space key={index} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
            <Select
              value={schema.value}
              style={{ width: 300 }}
              placeholder="Add schema to segment"
              onChange={(value) => handleSchemaChange(value, index)}
            >
              {schemaOptions
                .filter((option) => !selectedSchemas.map((s) => s.value).includes(option.value) || option.value === schema.value)
                .map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
            </Select>

            {selectedSchemas.length > 1 && (
              <MinusCircleOutlined onClick={() => removeSchema(index)} />
            )}
          </Space>
        ))}
      </div>

      <Button type="dashed" onClick={addSchema} block icon={<PlusOutlined />}>
        Add new schema
      </Button>

      <div className="form-footer">
        <Form.Item>
          <Button className='green-button' htmlType="submit" style={{ marginRight: 8 }}>
            Save the Segment
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default SegmentForm;

