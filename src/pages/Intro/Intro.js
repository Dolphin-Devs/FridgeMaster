import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Grid, Typography, Container, Box } from '@mui/material';
import Copyright from '../../components/Copyright';
import BasicButton from '../../components/BasicButton';
import video1 from '../../assets/_1_manage_food.mp4';
import video2 from '../../assets/_2_manage_fridge.mp4';
import video3 from '../../assets/_3_recipe.mp4';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import KitchenIcon from '@mui/icons-material/Kitchen';
import LocalDiningIcon from '@mui/icons-material/LocalDining';

const Fridge = () => {
  const { scene } = useGLTF('/retro_fridge.glb');
  return (
    <primitive 
      object={scene} 
      position={[0, 0, 0]} 
      scale={0.3} 
      rotation={[0.1, -0.5, 0]} //Rotate the fridge
    
    />);
};

const OrbitingObject = ({ object, radius, speed, offset, scale = 0.3 }) => {
  const ref = useRef();
  const clonedObject = object.clone();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const angle = time * speed + offset; // 시간에 따라 일정한 각도로 회전

    // 원형 궤도를 중심으로 회전
    ref.current.position.x = Math.cos(angle) * radius; // x축 회전
    ref.current.position.z = Math.sin(angle) * radius; // z축 회전
    ref.current.position.y = 0.5; // y축 고정 (냉장고 중심 높이)
  });

  return <primitive object={clonedObject} ref={ref} scale={scale} />;
};

const FoodPack = () => {
  const { scene } = useGLTF('/food_pack.glb');

  // 부모 오브젝트 필터링
  const parentObjects = [];
  scene.traverse((child) => {
    if (child.type === 'Object3D' && child.children.length > 0) {
      parentObjects.push(child);
    }
  });

  // 선택된 객체와 설정
  const selectedObjects = [
    { object: parentObjects[3], scale: 0.1 },
    { object: parentObjects[4] },
    { object: parentObjects[5], scale: 0.1 },
    { object: parentObjects[14], scale: 0.1 },
    { object: parentObjects[16], scale: 0.1 },
    { object: parentObjects[22], scale: 0.1 },
  ];

  // 일정한 반지름과 간격 계산
  const baseRadius = 2; // 기본 반지름
  const radiusIncrement = 0.5; // 각 객체 간 거리
  const speed = 0.5; // 동일한 속도

  return selectedObjects.map(({ object, scale }, index) => (
    <OrbitingObject
      key={object.uuid}
      object={object}
      scale={scale}
      radius={baseRadius + index * radiusIncrement} // 반지름 증가
      speed={speed} // 동일한 속도
      offset={(index * Math.PI * 2) / selectedObjects.length} // 균일한 각도 분포
    />
  ));
};

const App = () => (
  <Box
    sx={{
      height: '100vh',
      overflowY: 'scroll',
      scrollSnapType: 'y mandatory',
    }}
  >
    {/* Section 1: 3D Object, Logo, Basic butto for sign up and sign in */}
    <Box
      sx={{
        height: '100vh',
        scrollSnapAlign: 'start',

      }}
    >
      <Grid container direction="column" sx={{ height: '100%' }}>
        <Grid item xs={8}>
          <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <Canvas>
              <ambientLight intensity={0.8} />
              <directionalLight position={[10, 10, 10]} intensity={1} />
              <Fridge />
              <FoodPack />
              <OrbitControls enableZoom={true} />
            </Canvas>
          </Box>
        </Grid>

        <Grid item xs={2} sx={{ textAlign: 'center' }}>
          <Container>
            <Typography variant="h2" component="h3" sx={{ color: 'orange' }}>
              <p className="font-orange" style={{ margin: 0, display: 'inline' }}>
                FRIDGE <span className="font-white">MASTER</span>
              </p>
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: 'orange',
                mt: 1,
                fontSize: '1rem',
                lineHeight: 1.1,
              }}
            >
              Organize your fridge and manage your food using recipes.
            </Typography>
          </Container>
        </Grid>

        <Grid item xs={1} sx={{ textAlign: 'center'}}>
          <Container
            sx={{
              display: 'flex',
              gap: 4,
              justifyContent: 'center',
            }}
          >
            <BasicButton
              variant="contained"
              sx={{ color: 'white' }}
              href="./Signup"
            >
              Sign up
            </BasicButton>
            <BasicButton variant="outlined" href="./Login">
              Log in
            </BasicButton>
          </Container>
        </Grid>
      </Grid>
    </Box>

    {/* Section 2:  Demo Video for list*/}
    <Box
      sx={{
        height: '100vh',
        scrollSnapAlign: 'start',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid container sx={{ height: '100%', width: '90%' }}>
        {/* Left: Text */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 4,
          }}
        >
          <Typography variant="h4" sx={{ color: 'black', mb: 2, ml: 3 }}>
            <Stack direction="row" spacing={2} sx={{ gap: 2 }}>
              <Avatar sx={{ bgcolor: '#FFCC00' }}><DinnerDiningIcon /></Avatar> Manage Your Food
            </Stack>
          </Typography>
          <Typography variant="body1" sx={{ color: 'gray', lineHeight: 1.5 }}>
            <ul>
              <li>Add items with their name, date, storage, category, and quantity.</li>
              <li>Update item details like name, date, storage, category, and quantity.</li>
              <li>Remove items you no longer have.</li>
            </ul>
          </Typography>
        </Grid>

        {/* Right: video */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 4,
          }}
        >
          {/* Video Player */}
          <Box
            component="video"
            controls
            muted
            autoPlay
            sx={{
              width: '100%',
              maxWidth: '600px',
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <source src={video1} type="video/mp4"></source>
          </Box>
        </Grid>
      </Grid>
    </Box>

    {/* Section 3: Demo Video for fridge*/}
    <Box
      sx={{
        height: '100vh',
        scrollSnapAlign: 'start',
        backgroundColor: '#efefef',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid container sx={{ height: '100%', width: '90%' }}>
        {/* Left: Video */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 4,
          }}>
          {/* Right: Text */}
          <Box
            component="video"
            controls
            muted
            autoPlay
            sx={{
              width: '100%',
              maxWidth: '600px',
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <source src={video2} type="video/mp4" />
            Your browser does not support the video tag.
          </Box>

        </Grid>

        {/* Right: Text */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 4,
          }}
        >
          <Typography variant="h4" sx={{ color: 'black', mb: 2, ml: 3 }}>
            <Stack direction="row" spacing={2} sx={{ gap: 2 }}>
              <Avatar sx={{ bgcolor: '#FFCC00' }}><KitchenIcon /></Avatar> Manage Your Fridge
            </Stack>
          </Typography>
          <Typography variant="body1" sx={{ color: 'gray', lineHeight: 1.5, maxWidth: '600px' }}>
            <ul>
              <li>Add and Update your fridge with their name and image</li>
              <li>Check each items on the fridge</li>
              <li>Remove items you no longer have.</li>
            </ul>
          </Typography>
        </Grid>
      </Grid>
    </Box>
    {/* Section 4:  Demo Video for recipe*/}
    <Box
      sx={{
        height: '100vh',
        scrollSnapAlign: 'start',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid container sx={{ height: '100%', width: '90%' }}>
        {/* Left: Text */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 4,
          }}
        >
          <Typography variant="h4" sx={{ color: 'black', mb: 2, ml: 3 }}>
            <Stack direction="row" spacing={2} sx={{ gap: 2 }}>
              <Avatar sx={{ bgcolor: '#FFCC00' }}><LocalDiningIcon /></Avatar> Get Recipe Suggestions
            </Stack>
          </Typography>
          <Typography variant="body1" sx={{ color: 'gray', lineHeight: 1.5 }}>
            <ul>
              <li>Discover recipes based on items nearing their expiration date.</li>
              <li>Get personalized recipe suggestions to reduce food waste.</li>
              <li>Keep your fridge organized by using up soon-to-expire items first.</li>
            </ul>
          </Typography>
        </Grid>

        {/* Right: video */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 4,
          }}
        >
          {/* Video Player */}
          <Box
            component="video"
            controls
            muted
            autoPlay
            sx={{
              width: '100%',
              maxWidth: '600px',
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <source src={video3} type="video/mp4"></source>
          </Box>
        </Grid>
      </Grid>
    </Box>
    {/* Section 5: Final Page */}
    <Box
      sx={{
        height: '100vh',
        scrollSnapAlign: 'start',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Logo + Text + Copyright*/}
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h3" sx={{ color: 'orange', mb: 1 }}>
          <p className="font-orange" style={{ margin: 0, display: 'inline' }}>
            FRIDGE <span className="font-white">MASTER</span>
          </p>
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            color: 'orange',
            fontSize: '1rem',
            lineHeight: 1.1,
            mb: 3,
          }}
        >
          LET'S START RIGHT NOW
        </Typography>

        {/* 버튼 */}
        <Box
          sx={{
            display: 'flex',
            gap: 4,
            justifyContent: 'center',
          }}
        >
          <BasicButton
            variant="contained"
            sx={{ color: 'white' }}
            href="./Signup"
          >
            Sign up
          </BasicButton>
          <BasicButton variant="outlined" href="./Login">
            Log in
          </BasicButton>
        </Box>
      </Box>

      {/* Copyright 섹션 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          textAlign: 'center',
          width: '100%',
        }}
      >
        <Copyright />
      </Box>
    </Box>

  </Box>
);

export default App;
