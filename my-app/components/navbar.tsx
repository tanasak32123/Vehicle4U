import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import logo from "../public/react-icon.png";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/navbar.module.css";

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark"></Navbar>
  );
}
