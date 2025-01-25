package dev.abartczak.calorietracker.service;

import dev.abartczak.calorietracker.domain.DailyMenu;
import dev.abartczak.calorietracker.domain.User;
import dev.abartczak.calorietracker.dto.DailyMenuDTO;
import dev.abartczak.calorietracker.mapper.DailyMenuMapper;
import dev.abartczak.calorietracker.repository.DailyMenuRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class DailyMenuService {

    private final DailyMenuRepository dailyMenuRepository;
    private final DailyMenuMapper dailyMenuMapper;

    public DailyMenuDTO addNewMenu(DailyMenu dailyMenu) {
        DailyMenu savedMenu = dailyMenuRepository.save(dailyMenu);
        return dailyMenuMapper.toDailyMenuDTO(savedMenu);
    }

    public Optional<DailyMenuDTO> findById(Long id) {
        return dailyMenuRepository.findById(id)
                .map(dailyMenuMapper::toDailyMenuDTO);
    }

    public void deleteById(Long id) {
        dailyMenuRepository.deleteById(id);
    }

    public List<DailyMenuDTO> findByUser(User user) {
        return dailyMenuRepository.findByUser(user).stream()
                .map(dailyMenuMapper::toDailyMenuDTO)
                .collect(Collectors.toList());
    }

    public Optional<DailyMenuDTO> findByDate(LocalDate date) {
        return dailyMenuRepository.findByDate(date)
                .map(dailyMenuMapper::toDailyMenuDTO);
    }
}
