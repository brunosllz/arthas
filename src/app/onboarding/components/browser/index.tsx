import { Card, CardContent } from '@/components/ui/card'
import { BrowserHeader } from './header'
import { BrowserContent } from './content'
import { BrowserCanva } from './canva'
import { AvatarEditor } from './avata-editor'
import { useBoundStore } from '@/store'

export function Browser() {
  const cropAvatarImageStatus = useBoundStore.getState().cropAvatarImageStatus

  return (
    <Card className="h-[832px] overflow-hidden">
      <CardContent
        data-is-cropping={
          cropAvatarImageStatus === 'cropping' ||
          cropAvatarImageStatus === 'loading'
        }
        className="relative h-full pb-[52px] pt-[52px] data-[is-cropping=true]:flex data-[is-cropping=true]:items-center data-[is-cropping=true]:justify-center"
      >
        {(cropAvatarImageStatus === 'cropping' ||
          cropAvatarImageStatus === 'loading') && <AvatarEditor />}

        <BrowserCanva
          isHide={
            cropAvatarImageStatus === 'cropping' ||
            cropAvatarImageStatus === 'loading'
          }
        >
          <BrowserHeader />
          <BrowserContent />
        </BrowserCanva>
      </CardContent>
    </Card>
  )
}
