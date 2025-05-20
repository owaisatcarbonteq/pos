import { Grid, Input, theme } from "antd"
import { ChangeEvent, FC } from "react"

const { useBreakpoint } = Grid

type ISearchBarInputProps = {
  inputValue: string
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const SearchBarInput: FC<ISearchBarInputProps> = ({
  inputValue,
  handleInputChange,
}) => {
  const { token } = theme.useToken()
  const screens = useBreakpoint()
  const isMobile = !screens.md

  return (
    <Input
      style={{
        width: isMobile ? "100%" : "60%",
        borderStyle: "none",
        borderBottomStyle: "solid",
        borderRadius: 0,
        borderBottomColor: token.colorPrimary,
        textAlign: "center",
      }}
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Search catalog.."
    />
  )
}

export default SearchBarInput
