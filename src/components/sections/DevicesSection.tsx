'use client';

import Image from 'next/image';

const deviceTypes = [
    { icon: '/images/devices/Web1-3.png', name: 'Windows & Mac' },
    { icon: '/images/devices/Mobile1-4.png', name: 'iOS and Android' },
    { icon: '/images/devices/Roku-2.png', name: 'Roku' },
    { icon: '/images/devices/Firetv-2.png', name: 'Fire TV\nSelect Models' },
];

const deviceBrands = [
    { icon: '/images/devices/Samsung-1.png', name: 'SAMSUNG', subtext: 'Select TV Models' },
    { icon: '/images/devices/Android-2.png', name: 'androidtv', subtext: '' },
    { icon: '/images/devices/LG-2.png', name: 'LG', subtext: 'Select TV Models' },
    { icon: '/images/devices/Vizio-2.png', name: 'VIZIO', subtext: 'Select Models' },
    { icon: '/images/devices/Appletv-1.png', name: 'Apple TV', subtext: 'Select TV Models' },
];

const deviceBrands2 = [
    { icon: '/images/devices/Hisense1-2.png', name: 'Hisense', subtext: 'Select Devices' },
    { icon: '/images/devices/Cox-1.png', name: 'COX', subtext: 'Select Devices' },
    { icon: '/images/devices/Xfinity-1.png', name: 'Xfinity', subtext: 'Select Devices' },
    { icon: '/images/devices/Firetv-2.png', name: 'fire tv', subtext: 'Select Models' },
];

export function DevicesSection() {
    return (
        <section className="devices-section">
            <div className="container">
                <h2 className="section-title">Multi-Device Streaming Made Easy</h2>
                <p className="section-subtitle">
                    Enjoy on 5 devices at once and set up 6 user profiles — perfect for families, with built-in parental controls.
                </p>

                {/* Primary Devices */}
                <div className="devices-row primary">
                    {deviceTypes.map((device, index) => (
                        <div key={index} className="device-item">
                            <div className="device-icon">
                                <Image
                                    src={device.icon}
                                    alt={device.name}
                                    width={40}
                                    height={40}
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            <span className="device-name">{device.name}</span>
                        </div>
                    ))}
                </div>

                {/* Brand Devices Row 1 */}
                <div className="devices-row brands">
                    {deviceBrands.map((device, index) => (
                        <div key={index} className="device-brand">
                            <div className="brand-icon">
                                <Image
                                    src={device.icon}
                                    alt={device.name}
                                    width={80}
                                    height={30}
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            {device.subtext && <span className="brand-subtext">{device.subtext}</span>}
                        </div>
                    ))}
                </div>

                {/* Brand Devices Row 2 */}
                <div className="devices-row brands">
                    {deviceBrands2.map((device, index) => (
                        <div key={index} className="device-brand">
                            <div className="brand-icon">
                                <Image
                                    src={device.icon}
                                    alt={device.name}
                                    width={80}
                                    height={30}
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                            {device.subtext && <span className="brand-subtext">{device.subtext}</span>}
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .devices-section {
          padding: 4rem 1.5rem;
          background: #0D0D0D;
        }
        
        .container {
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
        }
        
        .section-title {
          color: white;
          font-size: clamp(1.5rem, 3vw, 2rem);
          margin-bottom: 1rem;
        }
        
        .section-subtitle {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
          margin-bottom: 3rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .devices-row {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        
        .devices-row.primary {
          margin-bottom: 3rem;
        }
        
        .device-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        
        .device-icon {
          filter: brightness(0) invert(1);
          opacity: 0.9;
        }
        
        .device-name {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.85rem;
          white-space: pre-line;
          text-align: center;
        }
        
        .device-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          min-width: 100px;
        }
        
        .brand-icon {
          filter: brightness(0) invert(1);
          opacity: 0.9;
        }
        
        .brand-subtext {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.75rem;
        }
        
        @media (max-width: 768px) {
          .devices-row {
            gap: 1.5rem;
          }
        }
      `}</style>
        </section>
    );
}
