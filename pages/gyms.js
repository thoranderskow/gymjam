
export default function Gyms({data}) {
    return(
      <h1>{data}</h1>
    )
}

export async function getServerSideProps() {
//  const res = await fetch(`https://.../data`)
  const data = 'heyo'//await res.json()

  return { props: { data } }
}
