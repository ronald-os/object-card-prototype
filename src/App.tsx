import { ThemeProvider, createTheme, CssBaseline, Box, Typography, Divider } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import {
  ObjectCard,
  defaultLargeActions,
  defaultSmallActions,
} from './components/ObjectCard';
import type { CardChip, MetaItem } from './components/ObjectCard';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
});

// ─── Demo Data ───────────────────────────────────────────────────────────────

const sampleChips: CardChip[] = [
  { label: 'Status', color: 'error', showStatus: true },
  { label: 'Tag', color: 'default' },
  { label: 'Tag', color: 'default' },
  { label: 'Tag', color: 'default' },
  { label: '2+', color: 'default' },
];

const metaRow1: MetaItem[] = [
  { label: 'Meta' },
  { label: 'Meta' },
];

const metaRow2: MetaItem[] = [
  { label: 'Meta', avatar: { icon: <PersonOutlineOutlinedIcon sx={{ fontSize: 14 }} /> } },
  { label: 'Meta' },
];

const SAMPLE_IMG = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80';

const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
];

const primaryText = 'The plumbing in this section of the ceiling is missing a section and is installed in the wrong location.';

// ─── Section Component ───────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#191e2a' }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {children}
      </Box>
    </Box>
  );
}

function StateLabel({ label }: { label: string }) {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="caption" sx={{ color: '#5a6475', fontWeight: 500 }}>
        {label}
      </Typography>
    </Box>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ maxWidth: 1400, mx: 'auto', p: 4 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
          {'<ObjectCard>'} Component
        </Typography>
        <Typography sx={{ mb: 4, color: '#5a6475' }}>
          BOB 2.0 Design System - All variants
        </Typography>

        <Divider sx={{ mb: 4 }} />

        {/* ── Large ── */}
        <Section title="Large - States (4:3)">
          <Box>
            <StateLabel label="Default" />
            <ObjectCard
              size="large"
              state="default"
              thumbnailAspectRatio="4:3"
              images={SAMPLE_IMAGES}
              primaryText={primaryText}
              chips={sampleChips}
              metaRow1={metaRow1}
              metaRow2={metaRow2}
              actions={defaultLargeActions}
              showPagination
              showMiniSheet
              sx={{ width: 416 }}
            />
          </Box>
          <Box>
            <StateLabel label="Hover" />
            <ObjectCard
              size="large"
              state="hover"
              thumbnailAspectRatio="4:3"
              images={SAMPLE_IMAGES}
              primaryText={primaryText}
              chips={sampleChips}
              metaRow1={metaRow1}
              metaRow2={metaRow2}
              actions={defaultLargeActions}
              showPagination
              showMiniSheet
              sx={{ width: 416 }}
            />
          </Box>
          <Box>
            <StateLabel label="Selected" />
            <ObjectCard
              size="large"
              state="selected"
              thumbnailAspectRatio="4:3"
              primaryText={primaryText}
              chips={sampleChips}
              metaRow1={metaRow1}
              metaRow2={metaRow2}
              actions={defaultLargeActions}
              showMiniSheet
              sx={{ width: 416 }}
            />
          </Box>
        </Section>

        {/* ── Large Aspect Ratios ── */}
        <Section title="Large - Aspect Ratios">
          <Box>
            <StateLabel label="1:1" />
            <ObjectCard
              size="large"
              thumbnailAspectRatio="1:1"
              images={SAMPLE_IMAGES}
              primaryText={primaryText}
              chips={sampleChips}
              metaRow1={metaRow1}
              metaRow2={metaRow2}
              actions={defaultLargeActions}
              showPagination
              showMiniSheet
              floatingChip={{ label: 'MetaChip' }}
              sx={{ width: 416 }}
            />
          </Box>
          <Box>
            <StateLabel label="4:3" />
            <ObjectCard
              size="large"
              thumbnailAspectRatio="4:3"
              images={SAMPLE_IMAGES}
              primaryText={primaryText}
              chips={sampleChips}
              metaRow1={metaRow1}
              metaRow2={metaRow2}
              actions={defaultLargeActions}
              showPagination
              showMiniSheet
              sx={{ width: 416 }}
            />
          </Box>
          <Box>
            <StateLabel label="16:9" />
            <ObjectCard
              size="large"
              thumbnailAspectRatio="16:9"
              images={SAMPLE_IMAGES}
              primaryText={primaryText}
              chips={sampleChips}
              metaRow1={metaRow1}
              metaRow2={metaRow2}
              actions={defaultLargeActions}
              showPagination
              showMiniSheet
              sx={{ width: 416 }}
            />
          </Box>
        </Section>

        {/* ── Large with Play Icon ── */}
        <Section title="Large - With Play Icon">
          <ObjectCard
            size="large"
            thumbnailAspectRatio="4:3"
            images={SAMPLE_IMAGES}
            primaryText={primaryText}
            showPlayIcon
            showPagination
            chips={sampleChips}
            metaRow1={metaRow1}
            metaRow2={metaRow2}
            actions={defaultLargeActions}
            sx={{ width: 416 }}
          />
        </Section>

        <Divider sx={{ mb: 4 }} />

        {/* ── Medium ── */}
        <Section title="Medium - States (1:1)">
          <Box>
            <StateLabel label="Default" />
            <ObjectCard
              size="medium"
              state="default"
              thumbnailAspectRatio="1:1"
              thumbnailSrc={SAMPLE_IMG}
              primaryText={primaryText}
              metaRow1={metaRow1}
              metaRow2={metaRow2}
              actions={defaultSmallActions}
              sx={{ width: 416 }}
            />
          </Box>
          <Box>
            <StateLabel label="Hover" />
            <ObjectCard
              size="medium"
              state="hover"
              thumbnailAspectRatio="1:1"
              thumbnailSrc={SAMPLE_IMG}
              primaryText={primaryText}
              metaRow1={metaRow1}
              metaRow2={metaRow2}
              actions={defaultSmallActions}
              sx={{ width: 416 }}
            />
          </Box>
          <Box>
            <StateLabel label="Selected" />
            <ObjectCard
              size="medium"
              state="selected"
              thumbnailAspectRatio="1:1"
              primaryText={primaryText}
              metaRow1={metaRow1}
              metaRow2={metaRow2}
              actions={defaultSmallActions}
              sx={{ width: 416 }}
            />
          </Box>
        </Section>

        <Section title="Medium - 3:4 Aspect Ratio">
          <ObjectCard
            size="medium"
            thumbnailAspectRatio="3:4"
            thumbnailSrc={SAMPLE_IMG}
            primaryText={primaryText}
            metaRow1={metaRow1}
            metaRow2={metaRow2}
            actions={defaultSmallActions}
            sx={{ width: 416 }}
          />
        </Section>

        <Divider sx={{ mb: 4 }} />

        {/* ── Small ── */}
        <Section title="Small - States">
          <Box>
            <StateLabel label="Default" />
            <ObjectCard
              size="small"
              state="default"
              thumbnailIcon={<DescriptionOutlinedIcon />}
              primaryText={primaryText}
              metaRow2={metaRow2}
              actions={defaultSmallActions}
              sx={{ width: 416 }}
            />
          </Box>
          <Box>
            <StateLabel label="Hover" />
            <ObjectCard
              size="small"
              state="hover"
              thumbnailIcon={<DescriptionOutlinedIcon />}
              primaryText={primaryText}
              metaRow2={metaRow2}
              actions={defaultSmallActions}
              sx={{ width: 416 }}
            />
          </Box>
          <Box>
            <StateLabel label="Selected" />
            <ObjectCard
              size="small"
              state="selected"
              thumbnailIcon={<DescriptionOutlinedIcon />}
              primaryText={primaryText}
              metaRow2={metaRow2}
              actions={defaultSmallActions}
              sx={{ width: 416 }}
            />
          </Box>
        </Section>

        <Divider sx={{ mb: 4 }} />

        {/* ── Responsive Grid Demo ── */}
        <Section title="Grid Layout Demo (Large)">
          {[1, 2, 3, 4].map((i) => (
            <ObjectCard
              key={i}
              size="large"
              thumbnailAspectRatio="4:3"
              thumbnailSrc={`${SAMPLE_IMG}&sig=${i}`}
              primaryText={`Item ${i} - ${primaryText}`}
              chips={sampleChips.slice(0, 3)}
              metaRow1={metaRow1}
              metaRow2={metaRow2}
              actions={defaultLargeActions}
              showPagination
              sx={{ width: 280, minWidth: 240 }}
            />
          ))}
        </Section>

        <Section title="List Layout Demo (Medium)">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 600 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <ObjectCard
                key={i}
                size="medium"
                thumbnailSrc={`${SAMPLE_IMG}&sig=${i + 10}`}
                primaryText={`Item ${i} - ${primaryText}`}
                metaRow1={metaRow1}
                metaRow2={metaRow2}
                actions={defaultSmallActions}
              />
            ))}
          </Box>
        </Section>

        <Section title="List Layout Demo (Small)">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%', maxWidth: 600 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <ObjectCard
                key={i}
                size="small"
                thumbnailIcon={<DescriptionOutlinedIcon />}
                primaryText={`Item ${i} - ${primaryText}`}
                metaRow2={metaRow2}
                actions={defaultSmallActions}
              />
            ))}
          </Box>
        </Section>
      </Box>
    </ThemeProvider>
  );
}

export default App;
