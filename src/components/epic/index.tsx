import { useUrlQueryParams } from 'utils/url'

export const Epic = () => {
  const [searchParams] = useUrlQueryParams(['name', 'personId'])
  console.log('searchParams: ', searchParams)
  return (
    <div>
      <h1>epic</h1>
    </div>
  )
}
