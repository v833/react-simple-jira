import { Button, Drawer, Form, Input, Spin } from 'antd'
import { useProjectModal } from './util'
import { IdSelect } from '../id-select/index'
import { useAddProject, useEditProject } from 'utils/project'
import { useForm } from 'antd/es/form/Form'
import { useEffect } from 'react'

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } = useProjectModal()
  const useMutateProject = editingProject ? useEditProject : useAddProject
  const { mutateAsync, isLoading: mutateLoading } = useMutateProject()
  const [form] = useForm()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields()
      close()
    })
  }

  const closeModal = () => {
    form.resetFields()
    close()
  }

  const title = editingProject ? '编辑项目' : '创建项目'

  useEffect(() => {
    form.setFieldsValue(editingProject)
  }, [editingProject, form])

  return (
    <Drawer forceRender onClose={closeModal} open={projectModalOpen} width="100%">
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          <h1>{title}</h1>
          <Form form={form} layout="vertical" style={{ width: '40rem' }} onFinish={onFinish}>
            <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入项目名!' }]}>
              <Input placeholder="请输入项目名" />
            </Form.Item>
            <Form.Item label="部门" name="organization" rules={[{ required: true, message: '请输入部门名!' }]}>
              <Input.TextArea rows={3} placeholder="请输入部门" />
            </Form.Item>
            <Form.Item label="负责人" name="personId">
              <IdSelect defaultOptionName="负责人" />
            </Form.Item>
            <Form.Item>
              <Button loading={mutateLoading} type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </Drawer>
  )
}
