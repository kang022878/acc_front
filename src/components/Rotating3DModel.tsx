import '@google/model-viewer';
import model3D from '../assets/3d-Hologramm_blender.glb';

export default function Rotating3DModel() {
  return (
    <div className="w-full h-full">
      <model-viewer
        src={model3D}
        alt="3D Hologram Model"
        auto-rotate
        auto-rotate-delay="0"
        rotation-per-second="18deg"
        camera-controls
        disable-zoom
        shadow-intensity="1"
        exposure="1.3"
        environment-image="neutral"
        // ✅ 자동으로 모델을 화면 중앙/적당한 크기로 맞추게 둠
        // camera-orbit, camera-target, field-of-view 일단 제거
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          display: 'block',
        }}
      />
    </div>
  );
}
