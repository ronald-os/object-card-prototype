import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  type SxProps,
  type Theme,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// ─── Types ───────────────────────────────────────────────────────────────────

export type ObjectCardSize = 'large' | 'medium' | 'small';
export type ObjectCardState = 'default' | 'hover' | 'selected';

export type ThumbnailAspectRatio =
  | '1:1'
  | '4:3'
  | '16:9'
  | '3:4';

export interface MetaItem {
  label: string;
  icon?: React.ReactNode;
  avatar?: {
    src?: string;
    icon?: React.ReactNode;
    initials?: string;
  };
}

export interface CardChip {
  label: string;
  color?: 'error' | 'default';
  showStatus?: boolean;
  icon?: React.ReactNode;
}

export interface CardAction {
  icon: React.ReactNode;
  onClick?: () => void;
  ariaLabel: string;
}

export interface ObjectCardProps {
  /** Card size variant */
  size?: ObjectCardSize;
  /** Visual state */
  state?: ObjectCardState;
  /** Thumbnail aspect ratio */
  thumbnailAspectRatio?: ThumbnailAspectRatio;
  /** Thumbnail image URL */
  thumbnailSrc?: string;
  /** Show play icon overlay on thumbnail */
  showPlayIcon?: boolean;
  /** Show pagination dots on thumbnail */
  showPagination?: boolean;
  /** Number of pagination dots (active dot is first) */
  paginationCount?: number;
  /** Show mini sheet overlay on thumbnail */
  showMiniSheet?: boolean;
  /** Mini sheet content (rendered in the overlay) */
  miniSheetContent?: React.ReactNode;
  /** Floating chip on the thumbnail */
  floatingChip?: CardChip;
  /** Primary text (1-2 lines) */
  primaryText: string;
  /** Maximum lines for primary text */
  primaryTextLines?: 1 | 2;
  /** Chips shown below primary text */
  chips?: CardChip[];
  /** First row of metadata (text-only items separated by dots) */
  metaRow1?: MetaItem[];
  /** Second row of metadata (can include avatars/icons) */
  metaRow2?: MetaItem[];
  /** Action buttons */
  actions?: CardAction[];
  /** Click handler for the card */
  onClick?: () => void;
  /** Whether the card is selected (controls state) */
  selected?: boolean;
  /** Custom sx overrides */
  sx?: SxProps<Theme>;
  /** Fallback icon for thumbnail when no image is provided */
  thumbnailIcon?: React.ReactNode;
}

// ─── Design Tokens ───────────────────────────────────────────────────────────

const tokens = {
  radius: {
    md: 8,
  },
  colors: {
    divider: 'rgba(0,0,0,0.12)',
    textPrimary: '#191e2a',
    textSecondary: '#5a6475',
    avatarFill: '#ced3d9',
    hoverBg: 'rgba(44,52,65,0.04)',
    selectedBg: 'rgba(0,57,255,0.08)',
    selectedMedia: '#0039ff',
    white: '#ffffff',
  },
  typography: {
    body2: 12,
    body3: 12,
    primaryText: 14,
  },
};

// ─── Sub-Components ──────────────────────────────────────────────────────────

/** CardMedia — Thumbnail with optional overlays */
function CardMedia({
  size,
  aspectRatio = '4:3',
  src,
  showPlayIcon,
  showPagination,
  paginationCount = 3,
  showMiniSheet,
  miniSheetContent,
  floatingChip,
  isSelected,
  thumbnailIcon,
}: {
  size: ObjectCardSize;
  aspectRatio?: ThumbnailAspectRatio;
  src?: string;
  showPlayIcon?: boolean;
  showPagination?: boolean;
  paginationCount?: number;
  showMiniSheet?: boolean;
  miniSheetContent?: React.ReactNode;
  floatingChip?: CardChip;
  isSelected?: boolean;
  thumbnailIcon?: React.ReactNode;
}) {
  const dimensions = getMediaDimensions(size, aspectRatio);
  const isLarge = size === 'large';

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: `${tokens.radius.md}px`,
        border: `1px solid ${tokens.colors.divider}`,
        overflow: 'hidden',
        flexShrink: 0,
        ...dimensions,
        ...(isSelected && {
          bgcolor: tokens.colors.selectedMedia,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }),
      }}
    >
      {/* Image or selected state */}
      {isSelected ? (
        <VisibilityOutlinedIcon
          sx={{
            color: tokens.colors.white,
            fontSize: isLarge ? 72 : size === 'medium' ? 40 : 24,
            opacity: 0.6,
          }}
        />
      ) : src ? (
        <Box
          component="img"
          src={src}
          alt=""
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: `${tokens.radius.md}px`,
          }}
        />
      ) : (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: '#f1f3f5',
            borderRadius: `${tokens.radius.md}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {thumbnailIcon && (
            <Box sx={{ color: tokens.colors.textSecondary, opacity: 0.5, fontSize: size === 'small' ? 24 : 48 }}>
              {thumbnailIcon}
            </Box>
          )}
        </Box>
      )}

      {/* Play icon overlay */}
      {showPlayIcon && !isSelected && isLarge && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <PlayArrowRoundedIcon
            sx={{
              fontSize: 72,
              color: 'rgba(255,255,255,0.9)',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
            }}
          />
        </Box>
      )}

      {/* Floating chip */}
      {floatingChip && !isSelected && isLarge && (
        <Box sx={{ position: 'absolute', top: 8, left: 8 }}>
          <Chip
            size="small"
            label={floatingChip.label}
            sx={{
              bgcolor: 'rgba(44,52,65,0.85)',
              color: tokens.colors.white,
              fontWeight: 500,
              fontSize: 12,
              height: 24,
              '& .MuiChip-icon': { color: tokens.colors.white },
            }}
            icon={floatingChip.icon as React.ReactElement | undefined}
          />
        </Box>
      )}

      {/* Pagination dots */}
      {showPagination && !isSelected && isLarge && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          {/* Gradient */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 50,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.4))',
              borderRadius: `0 0 ${tokens.radius.md}px ${tokens.radius.md}px`,
            }}
          />
          {/* Dots */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '4px',
            }}
          >
            {Array.from({ length: paginationCount }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: i === 0 ? tokens.colors.white : 'rgba(255,255,255,0.5)',
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Mini sheet */}
      {showMiniSheet && !isSelected && isLarge && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            width: 72,
            height: 72,
            borderRadius: `${tokens.radius.md}px`,
            border: `2px solid ${tokens.colors.white}`,
            bgcolor: tokens.colors.white,
            overflow: 'hidden',
            boxShadow: '0px 4px 18px 3px rgba(0,0,0,0.12), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 6px 6px -3px rgba(0,0,0,0.2)',
          }}
        >
          {miniSheetContent || (
            <Box sx={{ width: '100%', height: '100%', bgcolor: '#e8eaed' }} />
          )}
        </Box>
      )}
    </Box>
  );
}

/** Get media dimensions based on size and aspect ratio */
function getMediaDimensions(
  size: ObjectCardSize,
  aspectRatio: ThumbnailAspectRatio
): SxProps<Theme> {
  if (size === 'large') {
    const ratioMap: Record<string, number> = {
      '1:1': 1,
      '4:3': 3 / 4,
      '16:9': 9 / 16,
      '3:4': 4 / 3,
    };
    return {
      width: '100%',
      aspectRatio: `1 / ${ratioMap[aspectRatio] || 0.75}`,
    };
  }
  if (size === 'medium') {
    if (aspectRatio === '3:4') return { width: 90, height: 120 };
    return { width: 120, height: 120 };
  }
  // small
  return { width: 48, height: 48 };
}

/** CardChipGroup — Row of status/tag chips */
function CardChipGroup({ chips }: { chips: CardChip[] }) {
  if (!chips.length) return null;
  return (
    <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center', py: '4px', flexWrap: 'wrap' }}>
      {chips.map((chip, i) => (
        <Chip
          key={i}
          size="small"
          label={chip.label}
          icon={
            chip.showStatus ? (
              <FiberManualRecordIcon sx={{ fontSize: '8px !important' }} />
            ) : chip.icon ? (
              chip.icon as React.ReactElement
            ) : undefined
          }
          sx={{
            height: 24,
            fontSize: 12,
            fontWeight: 500,
            ...(chip.color === 'error'
              ? {
                  bgcolor: '#fdecea',
                  color: '#d32f2f',
                  '& .MuiChip-icon': { color: '#d32f2f' },
                }
              : {
                  bgcolor: '#e8eaed',
                  color: tokens.colors.textPrimary,
                }),
          }}
        />
      ))}
    </Box>
  );
}

/** MetaItemGroup — Row of metadata items separated by dots */
function MetaItemGroup({ items }: { items: MetaItem[] }) {
  if (!items.length) return null;
  return (
    <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center', minHeight: 20 }}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <Typography
              sx={{
                fontSize: tokens.typography.body3,
                fontWeight: 500,
                color: tokens.colors.textSecondary,
                lineHeight: 1.4,
                whiteSpace: 'nowrap',
              }}
            >
              &middot;
            </Typography>
          )}
          <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            {item.avatar && (
              <Avatar
                src={item.avatar.src}
                sx={{
                  width: 18,
                  height: 18,
                  fontSize: 10,
                  bgcolor: tokens.colors.avatarFill,
                  color: tokens.colors.textPrimary,
                }}
              >
                {item.avatar.icon || item.avatar.initials}
              </Avatar>
            )}
            {item.icon && (
              <Box sx={{ display: 'flex', color: tokens.colors.textSecondary, fontSize: 16 }}>
                {item.icon}
              </Box>
            )}
            <Typography
              sx={{
                fontSize: tokens.typography.body3,
                fontWeight: 500,
                color: tokens.colors.textSecondary,
                lineHeight: 1.4,
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </Typography>
          </Box>
        </React.Fragment>
      ))}
    </Box>
  );
}

/** CardActions — Action icon buttons */
function CardActions({
  actions,
  size,
}: {
  actions: CardAction[];
  size: ObjectCardSize;
}) {
  if (!actions.length) return null;

  // Small/Medium only show the last action (more menu)
  const visibleActions = size === 'large' ? actions : [actions[actions.length - 1]];

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
        flexShrink: 0,
      }}
    >
      {visibleActions.map((action, i) => (
        <IconButton
          key={i}
          size="small"
          onClick={action.onClick}
          aria-label={action.ariaLabel}
          sx={{
            width: 28,
            height: 28,
            '& .MuiSvgIcon-root': { fontSize: 16 },
          }}
        >
          {action.icon}
        </IconButton>
      ))}
    </Box>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function ObjectCard({
  size = 'large',
  state: stateProp,
  thumbnailAspectRatio = '4:3',
  thumbnailSrc,
  showPlayIcon = false,
  showPagination = false,
  paginationCount = 3,
  showMiniSheet = false,
  miniSheetContent,
  floatingChip,
  primaryText,
  primaryTextLines,
  chips = [],
  metaRow1 = [],
  metaRow2 = [],
  actions = [],
  onClick,
  selected = false,
  sx,
  thumbnailIcon,
}: ObjectCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const state = stateProp ?? (selected ? 'selected' : isHovered ? 'hover' : 'default');

  // Derive text lines based on size if not explicitly set
  const textLines = primaryTextLines ?? (size === 'large' ? 2 : 1);

  // Derive which sections to show based on size
  // Large: chips + both meta rows
  // Medium: both meta rows (no chips)
  // Small: meta row 2 only (avatar + text)
  const showChips = size === 'large' && chips.length > 0;
  const showMeta1 = (size === 'large' || size === 'medium') && metaRow1.length > 0;
  const showMeta2 = metaRow2.length > 0;

  const isVertical = size === 'large';

  return (
    <Box
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        display: 'flex',
        flexDirection: isVertical ? 'column' : 'row',
        alignItems: isVertical ? 'flex-start' : 'center',
        minWidth: 240,
        cursor: onClick ? 'pointer' : 'default',
        borderRadius: state !== 'default' ? `${tokens.radius.md}px` : undefined,
        bgcolor:
          state === 'hover'
            ? tokens.colors.hoverBg
            : state === 'selected'
              ? tokens.colors.selectedBg
              : 'transparent',
        transition: 'background-color 150ms ease',
        // Medium/Small: horizontal gap
        ...(!isVertical && {
          gap: size === 'small' ? 1 : 0,
          pr: size === 'small' ? 1 : 0,
        }),
        ...sx,
      }}
    >
      {/* Thumbnail */}
      <CardMedia
        size={size}
        aspectRatio={thumbnailAspectRatio}
        src={thumbnailSrc}
        showPlayIcon={showPlayIcon}
        showPagination={showPagination}
        paginationCount={paginationCount}
        showMiniSheet={showMiniSheet}
        miniSheetContent={miniSheetContent}
        floatingChip={floatingChip}
        isSelected={state === 'selected'}
        thumbnailIcon={thumbnailIcon}
      />

      {/* Card detail slot */}
      <Box
        sx={{
          display: 'flex',
          flex: isVertical ? undefined : '1 0 0',
          alignItems: isVertical ? 'flex-start' : 'center',
          minWidth: 0,
          minHeight: isVertical ? undefined : '1px',
          width: isVertical ? '100%' : undefined,
          alignSelf: isVertical ? undefined : 'stretch',
          ...(isVertical && { p: 1 }),
          ...(!isVertical && size === 'medium' && { px: 1 }),
        }}
      >
        {/* Card body */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1 0 0',
            minWidth: 0,
            justifyContent: 'center',
          }}
        >
          {/* Primary text */}
          <Box sx={{ minHeight: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography
              sx={{
                fontSize: tokens.typography.primaryText,
                fontWeight: 500,
                color: tokens.colors.textPrimary,
                lineHeight: 1.43,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: textLines,
                WebkitBoxOrient: 'vertical',
                minHeight: textLines === 2 ? 40 : 20,
              }}
            >
              {primaryText}
            </Typography>
          </Box>

          {/* Chips */}
          {showChips && <CardChipGroup chips={chips} />}

          {/* Meta row 1 (text only) */}
          {showMeta1 && <MetaItemGroup items={metaRow1} />}

          {/* Meta row 2 (with avatars) */}
          {showMeta2 && <MetaItemGroup items={metaRow2} />}
        </Box>

        {/* Actions */}
        {actions.length > 0 && (
          <CardActions actions={actions} size={size} />
        )}
      </Box>
    </Box>
  );
}

// ─── Convenience: Default actions matching the Figma spec ────────────────────

export const defaultLargeActions: CardAction[] = [
  { icon: <ShareOutlinedIcon />, ariaLabel: 'Share', onClick: () => {} },
  { icon: <BookmarkBorderOutlinedIcon />, ariaLabel: 'Bookmark', onClick: () => {} },
  { icon: <MoreVertIcon />, ariaLabel: 'More options', onClick: () => {} },
];

export const defaultSmallActions: CardAction[] = [
  { icon: <MoreVertIcon />, ariaLabel: 'More options', onClick: () => {} },
];

export default ObjectCard;
