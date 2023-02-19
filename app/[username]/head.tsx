export default function Head({
  params,
}: {
  params: { [key: string]: string | string[] | undefined }
}) {
  return (
    <>
      {/* To do: fetch userName and use in title */}
      <title>{params.username + ' / Bipper' || 'Bipper'}</title>
      <meta content='width=device-width, initial-scale=1' name='viewport' />
      <meta name='description' content='A social networking service' />
      <link rel='icon' href='/favicon.ico' />
    </>
  )
}
