import { searchPexels } from '@/lib/pexels'
import HomeClient from '@/components/HomeClient'

export default async function HomePage() {
  const [
    mosaicImages,
    differenceImages,
    bottleneckBgImages,
    talentBgImages,
    finalCtaBgImages,
  ] = await Promise.all([
    searchPexels('brand identity design creative agency', 9, 'square'),
    searchPexels('designer working dark studio creative', 1, 'portrait'),
    searchPexels('creative team dark studio', 1, 'landscape'),
    searchPexels('designer creative professional dark', 1, 'landscape'),
    searchPexels('modern office dark creative', 1, 'landscape'),
  ])

  return (
    <HomeClient
      mosaicImages={mosaicImages}
      differenceImage={differenceImages[0] ?? null}
      bottleneckBgImage={bottleneckBgImages[0] ?? null}
      talentBgImage={talentBgImages[0] ?? null}
      finalCtaBgImage={finalCtaBgImages[0] ?? null}
    />
  )
}
