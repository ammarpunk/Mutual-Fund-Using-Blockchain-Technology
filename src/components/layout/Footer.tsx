import { Container, Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box display="flex" justifyContent="space-between">
      {FOOTER_DATA.map(({ title, menuItem }, index) => (
        <Box key={`footer-widget-key-${index}`}>
          <Typography sx={{ fontSize: 18, fontWeight: "500", mb: 2 }}>
            {title}
          </Typography>
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px"
            }}
          >
            {menuItem.map(({ link, label }, index) => (
              <li
                key={`footer-menu-item-key-${index}`}
                style={{
                  listStyleType: "none",
                  fontSize: 14,
                  color: "#02073e"
                }}
              >
                <Link
                  href={link}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </Box>
      ))}
    </Box>
  );
};

export default Footer;

const FOOTER_DATA = [
  {
    title: "Company",
    menuItem: [
      {
        link: "#",
        label: "About team"
      },
      {
        link: "#",
        label: "Affiliate center"
      },
      {
        link: "#",
        label: "Careers & Culture"
      },
      {
        link: "#",
        label: "Blog news"
      },
      {
        link: "#",
        label: "Press & media"
      }
    ]
  },
  {
    title: "About Us",
    menuItem: [
      {
        link: "#",
        label: "Support Center"
      },
      {
        link: "#",
        label: "Customer Support"
      },
      {
        link: "#",
        label: "About Us"
      },
      {
        link: "#",
        label: "Copyright"
      },
      {
        link: "#",
        label: "Popular Campaign"
      }
    ]
  },
  {
    title: "Our Information",
    menuItem: [
      {
        link: "#",
        label: "Return Policy "
      },
      {
        link: "#",
        label: "Privacy Policy"
      },
      {
        link: "#",
        label: "Terms & Conditions"
      },
      {
        link: "#",
        label: "Site Map"
      },
      {
        link: "#",
        label: "Store Hours"
      }
    ]
  },
  {
    title: "My Account",
    menuItem: [
      {
        link: "#",
        label: "Press inquiries"
      },
      {
        link: "#",
        label: "Social media"
      },
      {
        link: "#",
        label: "directories"
      },
      {
        link: "#",
        label: "Images & B-roll"
      },
      {
        link: "#",
        label: "Permissions"
      }
    ]
  },
  {
    title: "Policy",
    menuItem: [
      {
        link: "#",
        label: "Application security"
      },
      {
        link: "#",
        label: "Software principles"
      },
      {
        link: "#",
        label: "Unwanted software policy"
      },
      {
        link: "#",
        label: "Responsible supply chain"
      }
    ]
  }
];
