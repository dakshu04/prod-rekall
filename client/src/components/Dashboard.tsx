import { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { TwitterTweetEmbed } from "react-twitter-embed"
import { toast } from "sonner"
interface ContentItem {
  _id: string
  title: string
  description: string
  link: string
  tag: string
}

// 🔹 Extract YouTube video ID from URL
const getYouTubeId = (url: string) => {
  const parsed = new URL(url)
  return parsed.searchParams.get("v")
}

// 🔹 Extract Tweet ID from Twitter URL
const getTweetId = (url: string) => {
  const match = url.match(/status\/(\d+)/)
  return match?.[1] || null
}

export const Dashboard = () => {
  const [contents, setContents] = useState<ContentItem[]>([])
  const [filtered, setFiltered] = useState<ContentItem[]>([])
  const [filterTag, setFilterTag] = useState<string>("all")

  // States for add content form
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [link, setLink] = useState("")
  const [tag, setTag] = useState("twitter")

  // States for edit dialog
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)

  // 🔹 Fetch content on load
  const fetchContent = async () => {
    const token = localStorage.getItem("token")
    const res = await axios.get("http://localhost:3000/api/user/content/all", {
      headers: { Authorization: `Bearer ${token}` },
    })
    setContents(res.data.contents)
    setFiltered(res.data.contents)
  }

  // 🔹 Submit new content
  const handleAddContent = async () => {
    const token = localStorage.getItem("token")
    await axios.post(
      "http://localhost:3000/api/user/content/add",
      { title, description, link, tag },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    setTitle("")
    setDescription("")
    setLink("")
    setTag("twitter")
    fetchContent()
  }

  // 🔹 Delete content
  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token")
    await axios.delete(`http://localhost:3000/api/user/content/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    fetchContent()
  }

  // 🔹 Submit edited content
  const handleEditSubmit = async () => {
    if (!editingItem) return
    const token = localStorage.getItem("token")
    await axios.put(
      `http://localhost:3000/api/user/content/edit/${editingItem._id}`,
      {
        title: editingItem.title,
        description: editingItem.description,
        link: editingItem.link,
        tag: editingItem.tag,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    setIsEditOpen(false)
    setEditingItem(null)
    fetchContent()
  }

  // 🔹 Filter by tag
  const handleFilter = (selectedTag: string) => {
    setFilterTag(selectedTag)
    if (selectedTag === "all") {
      setFiltered(contents)
    } else {
      setFiltered(contents.filter((item) => item.tag === selectedTag))
    }
  }

  useEffect(() => {
    fetchContent()
  }, [])

  return (
    <div className="flex h-screen text-black">
      {/* 🔹 Sidebar Navigation */}
      <aside className="w-64 bg-[#111b35] p-4 border-r text-white">
        <h1 className="text-2xl font-bold mb-6">Rekall 🔥</h1>
        <ul className="space-y-2">
          {["all", "twitter", "youtube"].map((tag) => (
            <li key={tag}>
              <button
                className={`w-full text-left p-2 rounded transition ${
                  filterTag === tag ? "bg-gray-300 text-black" : "hover:bg-gray-200 hover:text-black"
                }`}
                onClick={() => handleFilter(tag)}
              >
                {tag === "all" ? "All" : tag.charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            </li>
          ))}
        </ul>
        <Button onClick={() => {
          localStorage.removeItem("token")  // 🔑 Remove JWT
          toast.success("Logged out successfully ✅")
          setTimeout(() => {
          window.location.href = "/"
          }, 1000) }}  
          className=" bg-red-600 hover:bg-red-700 mt-2 text-white" >
          Logout
        </Button>
      </aside>

      {/* 🔹 Main Content */}
      <main className="flex-1 p-6 overflow-y-auto bg-[#1c2b52] text-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Saved Content</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-white text-black hover:bg-slate-200">Add Content</Button>
            </DialogTrigger>
            <DialogContent className="space-y-4 text-black">
              <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
              <Input placeholder="Link" value={link} onChange={(e) => setLink(e.target.value)} />
              <select
                className="w-full border rounded p-2"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              >
                <option value="twitter">Twitter</option>
                <option value="youtube">YouTube</option>
              </select>
              <Button onClick={handleAddContent}>Submit</Button>
            </DialogContent>
          </Dialog>
        </div>

        {/* Content Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div key={item._id} className="bg-white/5 border border-white/10 rounded-xl p-4 shadow text-white">
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-sm text-white/70 mb-2">{item.description}</p>

              {/* 🔹 Embedded YouTube Video */}
              {item.tag === "youtube" && getYouTubeId(item.link) && (
                <iframe
                  className="w-full aspect-video rounded"
                  src={`https://www.youtube.com/embed/${getYouTubeId(item.link)}`}
                  title="YouTube Video"
                  allowFullScreen
                />
              )}

              {/* 🔹 Embedded Twitter Tweet */}
              {item.tag === "twitter" && getTweetId(item.link) && (
                <div className="rounded overflow-hidden mt-2">
                  <TwitterTweetEmbed tweetId={getTweetId(item.link)!} />
                </div>
              )}

              {/* 🔹 Raw fallback link */}
              {!["youtube", "twitter"].includes(item.tag) && (
                <a href={item.link} className="text-blue-400 underline text-sm" target="_blank">
                  {item.link}
                </a>
              )}

              {/* Tag + Actions */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs font-bold bg-red-600 px-2 py-1 rounded-full">
                  {item.tag}
                </span>
                <div className="flex gap-2">
                  <Button
                    className="text-black"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingItem(item)
                      setIsEditOpen(true)
                    }}
                  >
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item._id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 🔹 Edit Dialog */}
        {editingItem && (
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent className="space-y-4 text-black">
              <Input
                placeholder="Title"
                value={editingItem.title}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
              />
              <Input
                placeholder="Description"
                value={editingItem.description}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
              />
              <Input
                placeholder="Link"
                value={editingItem.link}
                onChange={(e) => setEditingItem({ ...editingItem, link: e.target.value })}
              />
              <select
                className="w-full border rounded p-2"
                value={editingItem.tag}
                onChange={(e) => setEditingItem({ ...editingItem, tag: e.target.value })}
              >
                <option value="twitter">Twitter</option>
                <option value="youtube">YouTube</option>
              </select>
              <Button onClick={handleEditSubmit}>Update</Button>
            </DialogContent>
          </Dialog>
        )}
      </main>
    </div>
  )
}
