import { useAuth } from 'context/auth-context'
import { Form, Input, Button } from 'antd'

export const LoginScreen = ({ onError }: { onError: (e: Error) => void }) => {
  const { login } = useAuth()
  const handleSubmit = (values: { username: string; password: string }) => {
    try {
      login(values)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      onError(e)
    }
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder="用户名" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input placeholder="密码" type="password" />
      </Form.Item>
      <Button block type="primary" htmlType="submit">
        登录
      </Button>
    </Form>
  )
}
