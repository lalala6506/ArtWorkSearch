import { Navbar, Nav, Container, Form, Button} from 'react-bootstrap';
import { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { NavDropdown } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from "@/lib/userData";
import { removeToken ,readToken} from '@/lib/authenticate';







export default function MainNav() {

    const [searchField, setSearchField] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const router = useRouter();
    let token = readToken();
/*
    async function submitForm(e) {
        const queryString = `title=true&q=${searchField}`;
        e.preventDefault();
        setIsExpanded(false)
        setSearchHistory(current => [...current, queryString]);
        //console.log(`Search with key word: ${searchField}`);
        router.push(`/artwork?title=true&q=${searchField}`);
    }
*/
    async function submitForm(e) {
        e.preventDefault();

        const queryString = `title=true&q=${searchField}`;
        try {
          setIsExpanded(false);
          setSearchHistory(await addToHistory(queryString));
          router.push(`/artwork?${queryString}`);
        } catch (error) {
          console.error('Error adding to history:', error);

        }
        
    }
    function logout() {
        setIsExpanded(false);
        removeToken();
        router.push('/login');
    }
    return (
        <>

            <Navbar expanded={isExpanded} className="fixed-top navbar-dark bg-primary">
                <Container>
                    <Navbar.Brand >Cha Li</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse onClick={() => setIsExpanded(false)} id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === "/"} >Home</Nav.Link>
                            </Link>
                            {token && (
                                <Link href="/search" passHref legacyBehavior>
                                    <Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === '/search'}>
                                        Advanced Search
                                    </Nav.Link>
                                </Link>
                            )}



                        </Nav>
                        {token && (
                            <>
                                <Form className="d-flex" onSubmit={submitForm}>
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                        value={searchField}
                                        onChange={(e) => setSearchField(e.target.value)}
                                    />
                                    <Button type="submit" disabled={!searchField.trim()}>
                                        Search
                                    </Button>
                                </Form>
                                <Nav>
                                    <NavDropdown title={token.userName || 'User'} id="basic-nav-dropdown">
                                        <Link href="/favourites" passHref legacyBehavior>
                                            <NavDropdown.Item>Favourites</NavDropdown.Item>
                                        </Link>
                                        <Link href="/history" passHref legacyBehavior>
                                            <NavDropdown.Item>Search History</NavDropdown.Item>
                                        </Link>
                                        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </>
                        )}
                        {!token && (
                            <Nav>
                                <Link href="/register" passHref legacyBehavior>
                                    <Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === '/register'}>
                                        Register
                                    </Nav.Link>
                                </Link>
                                <Link href="/login" passHref legacyBehavior>
                                    <Nav.Link onClick={() => setIsExpanded(false)} active={router.pathname === '/login'}>
                                        Login
                                    </Nav.Link>
                                </Link>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
            <br />

        </>
    );
}