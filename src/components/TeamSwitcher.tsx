
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function TeamSwitcher() {
  return (
    <Select defaultValue="personal">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a team" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="personal">Personal Account</SelectItem>
        <SelectItem value="team">Team Account</SelectItem>
      </SelectContent>
    </Select>
  )
}