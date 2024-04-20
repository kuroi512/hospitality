import { Spin } from 'antd'

const Loading = ({ type }: { type?: 'relative' }) => (
  <div
    className={`flex items-center justify-center ${
      type === 'relative' ? 'h-full w-full' : 'h-screen w-screen'
    }`}
  >
    <Spin size='large' />
  </div>
)

export default Loading
