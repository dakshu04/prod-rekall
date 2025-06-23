import { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { TwitterTweetEmbed } from "react-twitter-embed"

interface ContentItem {
  _id: string
  title: string
  description: string
  link: string
  tag: string
}

// 🔹 Helper to get YouTube Video ID
const getYouTubeId = (url: string) => {
  const parsed = new URL(url)
  return parsed.searchParams.get("v")
}

// 🔹 Helper to get Tweet ID from URL
const getTweetId = (url: string) => {
  const match = url.match(/status\/(\d+)/)
  return match?.[1] || null
}

export const Dashboard = () => {
  const [contents, setContents] = useState<ContentItem[]>([])
  const [filtered, setFiltered] = useState<ContentItem[]>([])
  const [filterTag, setFilterTag] = useState<string>("all")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [link, setLink] = useState("")
  const [tag, setTag] = useState("twitter")

  const fetchContent = async () => {
    const token = localStorage.getItem("token")
    const res = await axios.get("http://localhost:3000/api/user/content/all", {
      headers: { Authorization: `Bearer ${token}` },
    })
    setContents(res.data.contents)
    setFiltered(res.data.contents)
  }

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

  const handleFilter = (selectedTag: string) => {
    setFilterTag(selectedTag)
    if (selectedTag === "all") {
      setFiltered(contents)
    } else {
      setFiltered(contents.filter(item => item.tag === selectedTag))
    }
  }

  useEffect(() => {
    fetchContent()
  }, [])

  return (
    <div className="flex h-screen text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111b35] p-4 border-r">
        <h1 className="text-2xl font-bold mb-6 text-white">Rekall 🔥</h1>
        <ul className="space-y-2 text-white">
          {["all", "twitter", "youtube"].map(tag => (
            <li key={tag}>
              <button
                className={`w-full text-left p-2 rounded ${filterTag === tag ? "bg-gray-300" : "hover:bg-gray-200"} ${filterTag === tag ? "text-black" : "hover:text-black"}`}
                onClick={() => handleFilter(tag)}
              >
                {tag === "all" ? "All" : tag.charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto bg-[#1c2b52] text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Saved Content</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-white text-black cursor-pointer hover:bg-slate-200">Add Content</Button>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div key={item._id} className="bg-white/5 border border-white/10 rounded-xl p-4 shadow text-white">
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-sm text-white/70 mb-2">{item.description}</p>

              {/* Embeds */}
              {item.tag === "youtube" && getYouTubeId(item.link) && (
                <iframe
                  className="w-full aspect-video rounded"
                  src={`https://www.youtube.com/embed/${getYouTubeId(item.link)}`}
                  title="YouTube Video"
                  allowFullScreen
                />
              )}

              {item.tag === "twitter" && getTweetId(item.link) && (
                <div className="rounded overflow-hidden mt-2">
                  <TwitterTweetEmbed tweetId={getTweetId(item.link)!} />
                </div>
              )}

              {/* Raw Link fallback */}
              {!["youtube", "twitter"].includes(item.tag) && (
                <a href={item.link} className="text-blue-400 underline text-sm" target="_blank">
                  {item.link}
                </a>
              )}

              <span className="text-xs text-white font-bold mt-5 bg-red-600 p-1 rounded-2xl">Tag: {item.tag}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
