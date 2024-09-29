import { randomUUID } from 'node:crypto'

export class DatabaseMemory {
   #video = new Map()

   list(search) {
      return Array.from(this.#video.entries()).map((videoArray) => {
         const id = videoArray[0]
         const data = videoArray[1]

         return {
            id,
            ...data
         }
      })
         .filter((video) => {
            if (search) {
               return video.title.includes(search)
            }

            return true
         })
   }

   create(video) {
      //* Unique Universal ID
      const videoID = randomUUID()

      this.#video.set(videoID, video)
   }

   update(id, video) {
      this.#video.set(id, video)
   }

   delete(id) {
      this.#video.delete(id)
   }


}