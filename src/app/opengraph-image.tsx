import { ImageResponse } from 'next/og'
import { profile } from '@/content/profile'
import { SITE } from '@/lib/constants'

export const alt = 'Dr Ioannis Valasakis — Research Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#6A22D6',
          color: '#F6F2EA',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 22,
            letterSpacing: 2,
            textTransform: 'uppercase',
            color: 'rgba(246,242,234,0.8)',
          }}
        >
          <span>{profile.name}</span>
          <span>ioannis.dev</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1.05 }}>
            {profile.tagline}
          </div>
          <div style={{ marginTop: 24, fontSize: 30, fontWeight: 700, color: '#C6F24E' }}>
            {profile.role}
          </div>
        </div>

        <div style={{ fontSize: 22, color: 'rgba(246,242,234,0.7)' }}>{SITE.description}</div>
      </div>
    ),
    { ...size },
  )
}
