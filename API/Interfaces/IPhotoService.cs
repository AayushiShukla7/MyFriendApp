using CloudinaryDotNet.Actions;

namespace API.Interfaces
{
    public interface IPhotoService
    {
        Task<ImageUploadResult> AddPhoto_Async(IFormFile file);

        Task<DeletionResult> DeletePhoto_Async(string publicId);
    }
}
