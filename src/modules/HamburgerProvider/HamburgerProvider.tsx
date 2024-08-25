import  { createContext, useState } from 'react'

export const HamburgerContext = createContext({})

const HamburgerProvider = ({ children }) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleMenu = () => setIsOpen((prevState) => !prevState)

	return (
		<HamburgerContext.Provider value={{ isOpen, setIsOpen, toggleMenu }}>
			{children}
		</HamburgerContext.Provider>
	)
}

export default HamburgerProvider
